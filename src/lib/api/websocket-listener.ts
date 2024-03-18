import { Dispatch, SetStateAction } from "react";

import { useGameState } from "../../store/store";
import {
  ITable,
  PlayerType,
  WSResponse
} from "../../shared/interfaces/pokerTable.interface";
import {
  WSEmojiResponse,
  WSRevealCardsRes,
  WSWinnerResponse,
  WsGlobalChangesResponse
} from "../../shared/interfaces/tableWSActions.interface";

export const websocketReducer = (
  data: WSResponse,
  setData: Dispatch<SetStateAction<ITable>>,
  setShowAnim: Dispatch<SetStateAction<boolean>>,
  setPlayerLose: Dispatch<SetStateAction<number[]>>,
  setShowLimitModal: Dispatch<SetStateAction<boolean>>,
  authUser?: PlayerType
) => {
  if (data.action === "global-changes") {
    const { data: d } = data as WsGlobalChangesResponse;

    setPlayerLose([]);
    useGameState.getState().resetShowedCards();
    setData(d);
  }

  if (data.action === "emoji") {
    const { emojiId, senderId } = data.data as WSEmojiResponse;

    setData((prev) => {
      const newData = [...prev.players];

      const sendedUserIdx = newData.findIndex((v) => v.id === senderId);

      newData[sendedUserIdx].emoji = emojiId;

      return {
        ...prev,
        players: newData
      };
    });
  }

  if (data.action === "reveal-cards") {
    const { data: d } = data as WSRevealCardsRes;

    setData((prev) => {
      const updatedData = prev.players.map(
        (p) => d.find((o) => o.id === p.id) || p
      );

      return {
        ...prev,
        players: updatedData
      };
    });
  }
  if (data.action === "winner") {
    const { kickedPlayers, potentialStreetCards, winner } =
      data as unknown as WSWinnerResponse;

    setData((prev) => {
      return {
        ...prev,
        winner: winner,
        potentialStreetCards: potentialStreetCards
      };
    });
    setShowAnim(true);
    setPlayerLose(kickedPlayers);
  }

  if (data.action === "limit-changes") {
    setShowLimitModal(true);
  }

  if (data.action === "show-card") {
    setData((prev) => {
      const updatedPlayers = [...prev.players];

      const showedCardPlayerIdx = updatedPlayers.findIndex(
        (v) => v.id === data.data.playerId
      );

      const playerHand = [...updatedPlayers[showedCardPlayerIdx].hand];

      if (data.data.hand.includes("")) {
        const shouldUpdateCardIdx = data.data.hand[0] === "" ? 1 : 0;

        playerHand[shouldUpdateCardIdx] = data.data.hand[shouldUpdateCardIdx];

        updatedPlayers[showedCardPlayerIdx].hand = playerHand;
      } else {
        updatedPlayers[showedCardPlayerIdx].hand = data.data.hand;
      }

      if (authUser?.id !== updatedPlayers[showedCardPlayerIdx].id) {
        return {
          ...prev,
          players: updatedPlayers
        };
      } else {
        return prev;
      }
    });
  }
};

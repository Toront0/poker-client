import { forwardRef, useState } from "react";

import img from "../../../assets/bg.webp";
import {
  findDealerIconPos,
  parsePositionToTailwindClass
} from "../../../lib/functions/helpers";

import PlayerBet from "./PlayerBet";

import PlayerImage from "./PlayerImage";
import PlayerInfo from "./PlayerInfo";

import PlayerEmojiDropdownTrigger from "./PlayerEmoji/PlayerEmojiDropdownTrigger";

interface IPlayer extends PlayerType {
  playerIdx: number;
  amountOfPlayers: number;
  winner: number[];
  isAllInStage: boolean;
  showAnim: boolean;
  authUser?: boolean;
  ref: React.MutableRefObject<HTMLDivElement | undefined>;
  flop: string[];
  wsRef?: WebSocket;
  reveal_card?: boolean;
  flip?: boolean;
  beingKicked?: boolean;
  playerPosition: PlayerPosition;
}

import { emojiesList } from "../../../lib/constants";
import PlayerEmoji from "./PlayerEmoji/PlayerEmoji";
import PlayerHand from "./PlayerHand";

import DeathIcon from "../../../components/Icons/DeathIcon";

import dealerIcon from "../../../assets/dealer-icon.png";
import { PlayerType } from "../../../shared/interfaces/pokerTable.interface";
import { PlayerPosition } from "../../../shared/interfaces/helperFunctions";

const Player2 = forwardRef(
  (
    {
      amountOfPlayers,
      playerIdx,
      authUser,
      username,
      chips,
      time_remains,
      time_bank,
      bet,
      status,
      hand,
      showAnim,
      action,
      winner,
      id,
      emoji,
      flop,
      wsRef,
      isAllInStage,
      beingKicked,
      playerPosition,
      is_dealer
    }: IPlayer,
    ref
  ) => {
    const [onHover, setOnHover] = useState(false);

    return (
      <div
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`absolute z-30 ${
          beingKicked ? "being-kicked" : ""
        }  ${parsePositionToTailwindClass(playerPosition)} `}
      >
        {is_dealer && (
          <div className={`absolute ${findDealerIconPos(playerPosition)} `}>
            <img
              src={dealerIcon}
              className="w-4 lg:w-6 h-4  lg:h-6 2xl:w-8 2xl:h-8"
            />
          </div>
        )}
        {bet !== 0 && (
          <PlayerBet
            bet={bet}
            amountOfPlayers={amountOfPlayers}
            playerIdx={playerIdx}
            playerPosition={playerPosition}
          />
        )}

        <div className="w-full h-full relative group">
          <div className="absolute  w-full h-full z-50 flex items-center justify-center  -translate-x-1/2 left-1/2">
            <PlayerEmoji emoji={emojiesList.find((v) => v.id === emoji)?.img} />
          </div>
          {beingKicked && (
            <div className="absolute  w-full h-full z-50 flex items-center justify-center  -translate-x-1/2 left-1/2">
              <DeathIcon />
            </div>
          )}

          {authUser && <PlayerEmojiDropdownTrigger wsRef={wsRef} />}
          <div
            className={`${
              action === "fold" ? "brightness-50" : "brightness-100"
            } w-full h-full relative z-40`}
          >
            <PlayerHand
              amountOfPlayers={amountOfPlayers}
              playerIdx={playerIdx}
              authUser={authUser}
              hand={hand}
              status={status}
              time_remains={time_remains}
              showAnim={showAnim}
              action={action}
              flop={flop}
              onHover={onHover}
            />

            <PlayerImage
              img={img}
              winners={winner}
              playerIdx={playerIdx}
              id={id}
              authUser={authUser}
            />
            <PlayerInfo
              username={username}
              chips={chips}
              time_bank={time_bank}
              time_remains={time_remains}
              status={status}
              action={action}
              winners={winner}
              isAllInStage={isAllInStage}
              authUser={id === 1}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default Player2;

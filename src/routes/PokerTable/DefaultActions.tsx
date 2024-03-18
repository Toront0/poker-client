import { useEffect, useState } from "react";
import CheckBox from "../../components/UI/CheckBox";

import { playerNextAction } from "../../lib/api/websocket-player-actions";
import { PlayerType } from "../../shared/interfaces/pokerTable.interface";

interface IDefaultActions {
  winners: number[];
  wsConn?: WebSocket;
  players: PlayerType[];
  userAmongPlayers: PlayerType;
  maxBetOnTable: number;
  min_bet: number;
  nextAction?: string;
  status: string;
}

const DefaultActions = ({
  winners,
  wsConn,
  userAmongPlayers,
  maxBetOnTable,
  min_bet,
  status,
  nextAction
}: IDefaultActions) => {
  const [nextAct, setNextAct] = useState(nextAction || "");

  const onCheckbox = async (value: string) => {
    let val = value;

    if (nextAct === value) {
      val = "";
    }

    setNextAct(val);
    playerNextAction(val, userAmongPlayers.id, wsConn);
  };

  useEffect(() => {
    console.log("INSIDE");

    if (winners.length !== 0) {
      setNextAct("");
    }
  }, [winners, status]);

  console.log(nextAct);

  return (
    <div className="absolute bottom-0 flex gap-2 left-0 p-2">
      {userAmongPlayers.bet < maxBetOnTable && (
        <div className="py-3 px-4 rounded bg-black border  border-opac-w-2">
          <CheckBox
            checked={nextAct === "fold"}
            label="Fold"
            name="fold"
            onChange={onCheckbox}
            id="fold"
          />
        </div>
      )}

      {userAmongPlayers.bet === maxBetOnTable &&
        userAmongPlayers.bet !== min_bet &&
        userAmongPlayers.action === "" &&
        userAmongPlayers.bet > 0 && (
          <div className="py-3 px-4 rounded bg-black border  border-opac-w-2">
            <CheckBox
              checked={nextAct === "checkOrFold"}
              label="Check/Fold"
              name="checkOrFold"
              onChange={onCheckbox}
              id="checkOrFold"
            />
          </div>
        )}
      {userAmongPlayers.bet === maxBetOnTable &&
        userAmongPlayers.action === "" &&
        userAmongPlayers.bet > 0 && (
          <div className="py-3 px-4 rounded bg-black border  border-opac-w-2">
            <CheckBox
              checked={nextAct === "check"}
              label="Check"
              name="check"
              onChange={onCheckbox}
              id="check"
            />
          </div>
        )}

      {userAmongPlayers.bet < maxBetOnTable && (
        <div className="py-3 px-4 rounded bg-black border  border-opac-w-2">
          <CheckBox
            checked={nextAct === "call"}
            label={`Call ${maxBetOnTable - userAmongPlayers.bet}`}
            name="call"
            onChange={onCheckbox}
            id="call"
          />
        </div>
      )}
    </div>
  );
};

export default DefaultActions;

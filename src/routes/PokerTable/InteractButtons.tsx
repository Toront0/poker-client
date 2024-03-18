import { useState, useEffect, ChangeEvent } from "react";
import { useAuthState } from "../../store/store";
import { clamp } from "../../lib/utils";

import { PiDotsThreeOutlineBold } from "react-icons/pi";
import Button from "../../components/Button";

import { MdKeyboardArrowUp } from "react-icons/md";
import DefaultActions from "./DefaultActions";
import {
  playerCall,
  playerCheck,
  playerFold,
  playerRaise
} from "../../lib/api/websocket-player-actions";
import { PlayerType } from "../../shared/interfaces/pokerTable.interface";

interface IInteractButtons {
  gameID: number;
  players: PlayerType[];
  pot: number;
  winners: number[];
  min_bet: number;
  nextAction?: string;
  wsConn?: WebSocket;
}

const InteractButtons = ({
  players,
  wsConn,
  pot,
  winners,
  min_bet,
  nextAction
}: IInteractButtons) => {
  const [rangeValue, setRangeValue] = useState(0);
  const authState = useAuthState((state) => state.user);
  const [hideButtons, setHideButtons] = useState(false);

  const onlyNumbers = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+e.target.value)) {
      return;
    }

    setRangeValue(+e.target.value);
  };

  const maxBetOnTable = Math.max(...players.map((p) => p.bet));
  // const minBetOnTable = Math.min(...players?.map((p) => p.bet));
  const userAmongPlayers = players?.find((p) => p.id === authState.id);

  useEffect(() => {
    setRangeValue(
      clamp(maxBetOnTable * 2, userAmongPlayers?.chips || 0, rangeValue)
    );
  }, [pot]);

  console.log("rangeValue", rangeValue);

  return (
    <>
      {userAmongPlayers && (
        <>
          {userAmongPlayers.status === "waiting" && (
            <DefaultActions
              userAmongPlayers={userAmongPlayers}
              players={players}
              winners={winners}
              wsConn={wsConn}
              maxBetOnTable={maxBetOnTable}
              min_bet={min_bet}
              status={userAmongPlayers.status}
              nextAction={nextAction}
            />
          )}
          {userAmongPlayers?.status === "active" && (
            <div
              className={`absolute bottom-0  lg:translate-y-0 transition-transform ${
                hideButtons ? "translate-y-full" : "translate-y-0"
              } right-0 w-full lg:w-fit h-1/2 lg:h-fit flex justify-end max-h-[200px] bg-opac-b-9 lg:bg-transparent z-40 `}
            >
              <div className="w-fit relative  p-2">
                <button
                  onClick={() => setHideButtons((p) => !p)}
                  className="absolute bottom-full px-2 py-1 bg-blue-4 rounded right-0 text-gray-10 flex xl:hidden items-center gap-2"
                >
                  {hideButtons ? "Открыть" : "Закрыть"}
                  <MdKeyboardArrowUp
                    className={`text-xl ${
                      hideButtons ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <div className="flex items-center  gap-3 justify-end">
                  <Button
                    onClick={() => setRangeValue(Math.round(pot * 0.45))}
                    className="w-1/4 h-8 shadow-poker-card"
                  >
                    45%
                  </Button>
                  <Button
                    onClick={() => setRangeValue(Math.round(pot * 0.65))}
                    className="w-1/4 h-8 shadow-poker-card"
                  >
                    65%
                  </Button>
                  <Button
                    onClick={() => setRangeValue(Math.round(pot * 0.85))}
                    className="w-1/4 h-8 shadow-poker-card"
                  >
                    85%
                  </Button>

                  <Button
                    className="w-1/4 h-8 shadow-poker-card"
                    onClick={() => setRangeValue(pot)}
                  >
                    Max
                  </Button>
                </div>
                <div className="flex justify-end items-center gap-2  my-4">
                  <div className="rounded bg-black border flex items-center justify-between border-opac-w-1 w-20 h-8 text-sm text-gray-12">
                    <input
                      type="text"
                      pattern="[0-9]*"
                      value={rangeValue}
                      onChange={onlyNumbers}
                      min={maxBetOnTable}
                      max={userAmongPlayers.bet}
                      step={50}
                      className="bg-transparent flex justify-center focus:outline-none w-full"
                      placeholder="Введите сумму"
                    />
                  </div>
                  <div className="w-64  h-1 cursor-pointer bg-opac-w-1 rounded relative">
                    <input
                      type="range"
                      name="range"
                      id="range"
                      min={maxBetOnTable}
                      step={10}
                      max={userAmongPlayers.chips}
                      value={rangeValue}
                      onChange={(e) => setRangeValue(+e.target.value)}
                      className="absolute w-full  z-20 cursor-pointer left-0  opacity-0"
                    />
                    <div className="w-[calc(100%-44px)] relative h-full">
                      <div
                        style={{
                          left:
                            (rangeValue / userAmongPlayers.chips) * 100 + "%"
                        }}
                        className="w-11 h-5 rounded-sm cursor-pointer  bg-gradient-to-t from-blue-5 via-blue-7 to-blue-10 shadow-poker-card flex items-center justify-center absolute top-1/2 -translate-y-1/2 "
                      >
                        <PiDotsThreeOutlineBold />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  {maxBetOnTable !== userAmongPlayers.bet && (
                    <Button
                      onClick={() => playerFold(authState.id, wsConn)}
                      className="w-32 h-12 xl:h-16 shadow-poker-card"
                    >
                      Fold
                    </Button>
                  )}
                  {maxBetOnTable !== userAmongPlayers.bet &&
                  maxBetOnTable > 0 ? (
                    <Button
                      onClick={() =>
                        playerCall(
                          authState.id,
                          Math.min(
                            userAmongPlayers.chips,
                            maxBetOnTable - userAmongPlayers.bet
                          ),
                          wsConn
                        )
                      }
                      className="w-32 h-12 xl:h-16 shadow-poker-card"
                    >
                      Call{" "}
                      <span className="block">
                        {Math.min(
                          maxBetOnTable - userAmongPlayers.bet,
                          userAmongPlayers.chips
                        )}
                      </span>
                    </Button>
                  ) : null}
                  {userAmongPlayers.bet === maxBetOnTable ? (
                    <Button
                      onClick={() => playerCheck(authState.id, wsConn)}
                      className="w-32 h-12 xl:h-16 shadow-poker-card"
                    >
                      Check
                    </Button>
                  ) : null}
                  {userAmongPlayers.chips > maxBetOnTable && (
                    <Button
                      onClick={() =>
                        playerRaise(authState.id, rangeValue, wsConn)
                      }
                      className="w-32 h-12 xl:h-16 shadow-poker-card"
                    >
                      Raise
                      <span className="block">
                        {clamp(
                          maxBetOnTable * 2,
                          userAmongPlayers?.chips || 0,
                          rangeValue
                        )}
                      </span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default InteractButtons;

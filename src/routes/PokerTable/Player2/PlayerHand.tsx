import {
  getFirstCardDestributionAnimation,
  getSecondCardDestributionAnimation,
  isPrimeHand,
  stringToCardImg
} from "../../../lib/functions/helpers";

import backCard from "../../../assets/cards/card-backward-1.png";
import { useGameState } from "../../../store/store";

export interface IPlayerHand {
  amountOfPlayers: number;
  playerIdx: number;
  authUser?: boolean;
  hand: string[];
  status: string;
  time_remains: number;
  showAnim: boolean;
  action: string;
  flop: string[];
  onHover: boolean;
}

const PlayerHand = ({
  action,
  amountOfPlayers,
  authUser,
  hand,
  showAnim,
  playerIdx,
  flop,
  onHover
}: IPlayerHand) => {
  const gameState = useGameState();

  return (
    <div
      className={`h-fit w-full w-full${
        authUser && !onHover && action === "fold" ? "hidden" : "block"
      }  `}
    >
      <div
        className={`${!authUser && action === "fold" ? "hidden" : ""} w-full`}
      >
        <div
          className={`absolute ${
            showAnim
              ? getFirstCardDestributionAnimation(amountOfPlayers, playerIdx)
              : ""
          }  will-change-transform   left-1  xl:left-3 ${
            authUser ? "bottom-5" : "bottom-2"
          } w-1/2`}
        >
          <div
            className={`w-full h-full  ${
              authUser && gameState.showedCards.includes(hand[0])
                ? "show-first-card drop-shadow-[-1px_1px_4px_rgba(0,0,0,.7)]"
                : ""
            } relative rounded-md -rotate-3 overflow-hidden`}
          >
            <div
              className={`xl:w-40 w-20 h-6 xl:h-10 bg-gradient-to-b   from-opac-w-2 via-opac-w-5  to-opac-w-1 absolute ${
                authUser &&
                isPrimeHand(hand) &&
                action === "" &&
                flop.length === 0
                  ? " animate-prime-card"
                  : "opacity-0"
              } -top-10 xl:-top-20 z-40  -left-1/2 -rotate-45`}
            ></div>
            <div className={`relative rt w-full h-full`}>
              <div className="w-full front ">
                <img
                  src={backCard}
                  alt=""
                  className=" object-cover w-[40px]  xl:w-full 2xl:w-full"
                />
              </div>
              <div className="w-full back   relative">
                <img
                  src={stringToCardImg(hand[0])}
                  alt=""
                  className=" object-cover w-[40px]  xl:w-full 2xl:w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute  ${
            showAnim
              ? getSecondCardDestributionAnimation(amountOfPlayers, playerIdx)
              : ""
          }  right-1 xl:right-2 ${authUser ? "bottom-5" : "bottom-2"} w-1/2`}
        >
          <div
            className={`w-full h-full rounded-md ${
              authUser && gameState.showedCards.includes(hand[1])
                ? "show-second-card drop-shadow-[1px_2px_4px_rgba(0,0,0,1)]"
                : ""
            }  rotate-6 relative overflow-hidden `}
          >
            <div
              className={`xl:w-40 w-20 h-6 xl:h-10 bg-gradient-to-b   from-opac-w-2 via-opac-w-5  to-opac-w-1 absolute ${
                authUser &&
                isPrimeHand(hand) &&
                action === "" &&
                flop.length === 0
                  ? " animate-prime-card"
                  : "opacity-0"
              } -top-10 xl:-top-20 z-40  -left-1/2 -rotate-45`}
            ></div>
            <div className={`relative  rt w-full h-full`}>
              <div className="w-full front ">
                <img
                  src={backCard}
                  alt=""
                  className=" object-cover w-[40px] xl:w-full"
                />
              </div>
              <div className="w-full back">
                <img
                  src={stringToCardImg(hand[1])}
                  alt=""
                  className=" object-cover w-[40px] xl:w-full"
                />
              </div>
            </div>
          </div>
        </div>
        {/* {flop.length === 0 ? (
          <div
            className={`absolute ${getFirstCardDestributionAnimation(
              amountOfPlayers,
              playerIdx
            )}  will-change-transform   left-1  xl:left-3 ${
              authUser ? "bottom-5" : "bottom-2"
            } w-1/2`}
          >
            <div
              className={`w-full h-full  ${
                authUser && gameState.showedCards.includes(hand[0])
                  ? "show-first-card drop-shadow-[-1px_1px_4px_rgba(0,0,0,.7)]"
                  : ""
              } relative rounded-md -rotate-3 overflow-hidden`}
            >
              <div
                className={`xl:w-40 w-28 h-6 xl:h-10 bg-gradient-to-b   from-opac-w-2 via-opac-w-5  to-opac-w-1 absolute ${
                  authUser &&
                  isPrimeHand(hand) &&
                  action === "" &&
                  flop.length === 0
                    ? " animate-prime-card"
                    : "opacity-0"
                } -top-10 xl:-top-20 z-40  -left-1/2 -rotate-45`}
              ></div>
              <div
                className={`relative  ${showAnim ? "rt" : ""} w-full h-full`}
              >
                <div className="w-full front ">
                  <img
                    src={backCard}
                    alt=""
                    className=" object-cover w-[40px]  xl:w-full 2xl:w-full"
                  />
                </div>
                <div className="w-full back   relative">
                  <img
                    src={stringToCardImg(hand[0])}
                    alt=""
                    className=" object-cover w-[40px]  xl:w-full 2xl:w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`absolute   will-change-transform left-1  xl:left-2 ${
              authUser ? "bottom-5" : "bottom-2"
            } w-1/2 `}
          >
            <div
              className={`w-full h-full rounded-md -rotate-3 ${
                authUser && gameState.showedCards.includes(hand[0])
                  ? "show-first-card drop-shadow-[-1px_1px_4px_rgba(0,0,0,.7)]"
                  : ""
              } relative overflow-hidden`}
            >
              <div
                className={`xl:w-40 w-28 h-6 xl:h-10 bg-gradient-to-b from-opac-w-6 via-opac-w-4  to-opac-w-1 absolute ${
                  authUser &&
                  isPrimeHand(hand) &&
                  action === "" &&
                  flop.length === 0
                    ? " animate-prime-card"
                    : "opacity-0"
                } z-40 -top-10 xl:-top-24 -left-1/2 -rotate-45`}
              ></div>
              <div className=" relative  w-full h-full">
                <div className="w-full  relative">
                  <img
                    src={stringToCardImg(hand[0])}
                    alt=""
                    className=" object-contain w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {flop.length === 0 ? (
          <div
            className={`absolute ${
              status === "active" && time_remains <= 0
                ? "brightness-50"
                : "brightness-100"
            } ${getSecondCardDestributionAnimation(
              amountOfPlayers,
              playerIdx
            )}   right-1 xl:right-2 ${
              authUser ? "bottom-5" : "bottom-2"
            } w-1/2`}
          >
            <div
              className={`w-full h-full rounded-md ${
                authUser && gameState.showedCards.includes(hand[1])
                  ? "show-second-card drop-shadow-[1px_2px_4px_rgba(0,0,0,1)]"
                  : ""
              }  rotate-6 relative overflow-hidden `}
            >
              <div
                className={`xl:w-40 w-28 h-6 xl:h-10 bg-gradient-to-b   from-opac-w-2 via-opac-w-5  to-opac-w-1 absolute ${
                  authUser &&
                  isPrimeHand(hand) &&
                  action === "" &&
                  flop.length === 0
                    ? " animate-prime-card"
                    : "opacity-0"
                } -top-10 xl:-top-20 z-40  -left-1/2 -rotate-45`}
              ></div>
              <div
                className={`relative  ${showAnim ? "rt" : ""} rt w-full h-full`}
              >
                <div className="w-full front ">
                  <img
                    src={backCard}
                    alt=""
                    className=" object-cover w-[40px] xl:w-full"
                  />
                </div>
                <div className="w-full back">
                  <img
                    src={stringToCardImg(hand[1])}
                    alt=""
                    className=" object-cover w-[40px] xl:w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`absolute right-1 xl:right-2 ${
              authUser ? "bottom-5" : "bottom-2"
            } w-1/2`}
          >
            <div
              className={`w-full h-full rounded-md relative  ${
                authUser && gameState.showedCards.includes(hand[1])
                  ? "show-second-card drop-shadow-[1px_2px_4px_rgba(0,0,0,1)]"
                  : ""
              } rotate-6 overflow-hidden`}
            >
              <div
                className={`xl:w-40 w-20 h-6 xl:h-10 bg-gradient-to-b  from-opac-w-2 via-opac-w-5  to-opac-w-1 absolute ${
                  authUser &&
                  isPrimeHand(hand) &&
                  action === "" &&
                  flop.length === 0
                    ? "animate-prime-card"
                    : "opacity-0"
                }  -top-10 xl:-top-20 z-40  -left-1/2 -rotate-45`}
              ></div>
              <div className=" relative  w-full h-full">
                <div className="w-full relative ">
                  <img
                    src={stringToCardImg(hand[1])}
                    alt=""
                    className=" object-contain  w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PlayerHand;

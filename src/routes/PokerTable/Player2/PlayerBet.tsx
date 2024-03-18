import {
  chipFromIdx,
  determineChipStack,
  determineChipsPosition
} from "../../../lib/functions/helpers";
import { PlayerPosition } from "../../../shared/interfaces/helperFunctions";

interface IPlayerBet {
  amountOfPlayers: number;
  playerIdx: number;
  bet: number;
  playerPosition: PlayerPosition;
}

const PlayerBet = ({ bet, playerPosition }: IPlayerBet) => {
  return (
    <div className={`absolute  ${determineChipsPosition(playerPosition)}`}>
      <div className="flex items-center ">
        <div
          className={`relative  w-16    h-7 ${
            playerPosition === "position-2" || playerPosition === "position-6"
              ? "w-8 lg:w-10 xl:w-20"
              : "xl:w-28"
          }   flex flex-wrap items-center justify-end`}
        >
          {determineChipStack(bet).map((chips, i) => (
            <div key={i}>
              {chips > 0 && (
                <div className="flex relative w-3 h-3 md:w-4 md:h-4 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7">
                  {Array.from({ length: chips }).map((_, j) => (
                    <img
                      key={j}
                      src={chipFromIdx(i)}
                      alt="chips"
                      style={{ top: `-${j * 2}px` }}
                      className={`absolute  object-cover`}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <span className="text-gray-12 rounded px-2 py-px bg-opac-w-1 font-medium text-[9px] xl:text-sm">
          {bet}
        </span>
      </div>
    </div>
  );
};

export default PlayerBet;

import { useRef, useEffect, MutableRefObject } from "react";

import {
  chipFromIdx,
  determineChipStack,
  formatPlayers
} from "../../lib/functions/helpers";
import { useAuthState } from "../../store/store";
import { PlayerType } from "../../shared/interfaces/pokerTable.interface";

interface IChipsOnTable {
  pot: number;
  players: PlayerType[];
  winners: number[];
  flop: string[];
  playersRef?: MutableRefObject<HTMLDivElement | undefined>[];
}

const ChipsOnTable = ({
  pot,
  players,
  winners,
  flop,
  playersRef
}: IChipsOnTable) => {
  const authState = useAuthState((s) => s.user);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (winners?.length === 0 || flop?.length === 0) return;

    const rect = ref.current?.getBoundingClientRect();

    if (playersRef && ref.current && rect) {
      const winnerIdx = formatPlayers(players, authState.id)?.findIndex((w) =>
        winners.find((p) => p === w.id)
      );

      console.log("winnerIdx", winnerIdx);

      if (winnerIdx === undefined) {
        return;
      }

      const newTopPos =
        playersRef[winnerIdx].current?.getBoundingClientRect().y;
      const newLeftPos =
        playersRef[winnerIdx].current?.getBoundingClientRect().x || 0;

      const moveAnimation = [
        {
          top: newTopPos + "px",
          opacity: 1,
          left: (newLeftPos - rect.x) * 1 > 100 ? newLeftPos + "px" : null
        },
        {
          top: newTopPos + "px",
          left: (newLeftPos - rect.x) * 1 > 100 ? newLeftPos + "px" : null,
          offset: 0.9,
          opacity: 1
        },
        {
          top: newTopPos + "px",
          left: (newLeftPos - rect.x) * 1 > 100 ? newLeftPos + "px" : null,
          opacity: 0
        }
      ];

      const options: KeyframeAnimationOptions = {
        duration: 6000,
        delay: 1000
      };

      if (winners.length > 0) {
        ref.current?.animate(moveAnimation, options);
      } else {
        ref.current.style.top = "";
        ref.current.style.left = "";
      }
    }

    console.log("chips rect", rect);
  }, [winners]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`flex absolute z-[80] top-[55%]`}
    >
      {determineChipStack(pot).map((chips, i) => (
        <div key={i}>
          {flop?.length > 0 && (
            <div className="flex relative w-4 h-4 xl:w-5 xl:h-5  2xl:w-7 2xl:h-7">
              {Array.from({ length: chips }).map((_, j) => (
                <img
                  key={j}
                  src={chipFromIdx(i)}
                  alt="chip amount"
                  style={{ top: `-${j * 2}px` }}
                  className={`absolute w-4 h-4 xl:w-5 xl:h-5  2xl:w-7 2xl:h-7 object-cover`}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChipsOnTable;

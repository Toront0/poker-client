import { useEffect, useRef, useState } from "react";

import PlayerTimeBank from "./PlayerTimeBank";
import { formatMoney } from "../../../lib/utils";

interface IPlayerInfo {
  username: string;
  chips: number;
  time_bank: number;
  time_remains: number;
  status: string;
  action: string;
  winners: number[];
  isAllInStage: boolean;
  authUser?: boolean;
}

const PlayerInfo = ({
  username,
  chips,
  time_bank,
  time_remains,
  status,
  winners,
  isAllInStage,
  authUser
}: IPlayerInfo) => {
  const [secs, setSecs] = useState(time_remains);
  const timeRef = useRef<number>();

  useEffect(() => {
    if (status !== "active") {
      return () => {
        setSecs(20);
      };
    }

    if (time_remains < 0) {
      return () => {
        setSecs(time_remains);
      };
    }

    if (!timeRef.current) {
      const id = setInterval(() => {
        setSecs((prev) => prev - 1);
      }, 1000);
      timeRef.current = id;

      return () => {
        clearInterval(timeRef.current);
        timeRef.current = undefined;
      };
    }
  }, [secs, status]);

  return (
    <div
      className={`relative   lg:w-24  ${
        authUser ? "w-20" : "w-16"
      } 2xl:w-36 xl:w-28 h-7 lg:h-10 xl:h-12 2xl:h-14 rounded`}
    >
      {status === "active" &&
        chips !== 0 &&
        winners.length === 0 &&
        !isAllInStage && (
          <div className="absolute top-full left-0 w-full z-10 h-[3px] xl:h-1.5 rounded-sm">
            <div
              style={{ width: (secs / 20) * 100 + "%" }}
              className="absolute h-full bg-gradient-to-r rounded-sm transition-all from-purple-11 via-purple-9 to-purple-11 top-0 left-0"
            ></div>
          </div>
        )}

      {!isAllInStage &&
        time_bank > 0 &&
        secs <= 0 &&
        status === "active" &&
        chips !== 0 &&
        winners.length === 0 && <PlayerTimeBank time_bank={time_bank} />}
      <div
        className={`w-full h-full ${
          !isAllInStage &&
          status === "active" &&
          winners.length === 0 &&
          chips !== 0
            ? "anim"
            : ""
        }  bg-gray-1  border border-opac-w-1 relative shadow-poker-card rounded`}
      >
        <div className=" w-full  flex h-1/2  justify-center  items-center  z-20 leading-none text-[8px] lg:text-xs 2xl:text-base font-semibold text-white">
          {username}
        </div>
        <div className=" bottom-1.5  h-1/2 z-20 pt-1  w-full leading-none justify-center flex text-[8px] lg:text-xs 2xl:text-base font-semibold text-blue-12">
          {chips === 0 ? "ALL-IN" : formatMoney(chips)}
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;

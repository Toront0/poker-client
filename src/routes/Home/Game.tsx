import { useState } from "react";

import { IoPeopleSharp } from "react-icons/io5";

import { HiLockClosed } from "react-icons/hi";
import { useAuthState } from "../../store/store";

import { MdOutlineAccessTimeFilled } from "react-icons/md";

import GameDetailModal from "../../components/Modals/GameDetailModal";

export type GameType = {
  id: number;
  createdAt: Date;
  name: string;
  buyIn: number;
  amountOfPlayers: number;
  prize: number;
  isPrivate: boolean;
  playersInRoom: number[];
  mode: string;
  prizeDestribution: string;
  state: string;
};

const Game = ({
  id,
  name,
  buyIn,
  amountOfPlayers,
  prize,
  isPrivate,
  playersInRoom,
  mode,
  state
}: GameType) => {
  const authState = useAuthState((s) => s.user);
  const [expandGameDetail, setExpandGameDetail] = useState(false);

  return (
    <div
      className={`w-full ${
        playersInRoom?.includes(authState.id)
          ? "bg-blue-4 brightness-125"
          : "bg-gradient-to-r from-blue-3 via-blue-2 to-blue-2"
      } h-9 hover:brightness-150 cursor-pointer text-gray-10  border-t border-opac-w-2 rounded-t`}
    >
      {expandGameDetail && (
        <GameDetailModal
          buyIn={buyIn}
          onClose={() => setExpandGameDetail(false)}
          gameId={id}
          playersInRoom={playersInRoom}
          isPrivate={isPrivate}
          amountOfPlayers={amountOfPlayers}
        />
      )}
      <div
        onClick={() => setExpandGameDetail(true)}
        className="w-full h-full text-[11px] md:text-xs lg:text-sm grid md:grid-cols-8 grid-cols-5"
      >
        <div className="h-full gap-2 flex  items-center col-span-2 px-2  ">
          {playersInRoom?.includes(authState.id) && (
            <MdOutlineAccessTimeFilled className="text-base" />
          )}
          {name}
        </div>
        <div className=" h-full flex  items-center justify-center col-span-1 px-2  border-x border-opac-w-2">
          ${buyIn}
        </div>
        <div className=" gap-2 h-full flex  items-center col-span-1 justify-center px-2  ">
          <IoPeopleSharp className="text-base md:text-lg" />
          {playersInRoom ? playersInRoom.length : 0} / {amountOfPlayers}
        </div>
        <div className=" h-full flex   items-center justify-center col-span-1 px-2  border-l border-opac-w-2">
          ${prize}
        </div>
        <div className=" hidden md:flex  text-[13px] col-span-1 gap-1 items-center justify-center text-center px-2  border-l border-opac-w-2">
          {isPrivate ? <HiLockClosed className="text-lg" /> : null}
          {isPrivate ? "Приватный" : "Открытый"}
        </div>
        <div className=" hidden md:flex   h-full items-center col-span-1 justify-center px-2  border-l border-opac-w-2">
          {mode === "turbo"
            ? "Турбо"
            : mode === "regular"
            ? "Регуляр"
            : "Гипер Турбо"}
        </div>
        <div className=" h-full hidden md:flex items-center justify-center col-span-1 px-2  border-l border-opac-w-2">
          {state}
        </div>
      </div>
    </div>
  );
};

export default Game;

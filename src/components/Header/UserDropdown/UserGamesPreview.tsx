import { Link } from "react-router-dom";
import { useAuthState } from "../../../store/store";
import { useEffect, useState } from "react";

import { GiPokerHand } from "react-icons/gi";

import { MdKeyboardArrowLeft } from "react-icons/md";
import Button from "../../Button";

import { FaQuestion } from "react-icons/fa";
import { addEndingToWinPlace } from "../../../lib/functions/helpers";

type GamePreview = {
  id: number;
  name: string;
  prize: number;
  state: string;
  place: number;
};

export type UserGames = {
  games: GamePreview[];
  totalGames: number;
};

interface IUserGamesPreview {
  onBack: () => void;
}

const UserGamesPreview = ({ onBack }: IUserGamesPreview) => {
  const authState = useAuthState((s) => s.user);
  const [data, setData] = useState({} as UserGames);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_ORIGIN}/user-games/${
            authState.id
          }?limit=10&page=0`
        );

        const data = await res.json();

        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    handler();
  }, []);

  return (
    <div className="mt-3 h-80 flex flex-col">
      <button
        onClick={onBack}
        className="flex text-sm text-gray-8 items-center gap-1 "
      >
        <MdKeyboardArrowLeft className="text-2xl" />
        <span className=" font-medium">Назад</span>
      </button>
      {isLoading ? (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-11 rounded my-1 bg-opac-w-1 animate-pulse"
            ></div>
          ))}
        </>
      ) : (
        <>
          {data.games?.length > 0 ? (
            <div className="w-full h-full overflow-y-auto">
              {data.games?.map((v) => (
                <Link
                  to={`/game/${v.id}`}
                  target="__blank"
                  className="flex items-center   mb-2 hover:bg-opac-w-1  rounded px-2 py-1.5"
                >
                  <div className="flex items-center gap-2  min-w-[90%] ">
                    <div className="min-w-[30px] h-10 font-bold rounded-full text-white flex items-center justify-center">
                      {v.place === 0 ? (
                        <FaQuestion />
                      ) : (
                        <span>
                          {v.place}
                          <span className="text-xs">
                            {addEndingToWinPlace(v.place)}
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-white truncate  font-medium">
                      <span className=" w-full">{v.name}</span>
                      <h5 className="font-normal text-xs">${v.prize}</h5>
                    </div>
                  </div>
                  <div className="flex items-center rounded-full w-full  justify-center gap-2 text-xs font-medium text-gray-12">
                    <div
                      className={`w-2.5 h-2.5 rounded-full relative ${
                        v.state === "Регистрация"
                          ? "bg-[#2bf819]"
                          : v.state === "Идет"
                          ? "bg-[#f00]"
                          : "bg-blue-5"
                      }`}
                    >
                      <div
                        style={{ backgroundColor: "inherit" }}
                        className={`w-2.5 h-2.5 rounded-full absolute ${
                          v.state !== "Завершен" && "animate-ping"
                        }`}
                      ></div>
                    </div>
                  </div>
                </Link>
              ))}

              {data?.totalGames > 5 && (
                <Button>Посмотреть остальные ${data.totalGames - 5}</Button>
              )}
            </div>
          ) : (
            <div className="flex items-center  flex-col justify-center h-full text-gray-12">
              <GiPokerHand className="text-5xl" />
              <span className="text-sm">У вас нет последних игр</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserGamesPreview;

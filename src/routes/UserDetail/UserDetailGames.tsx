import { useState, useEffect } from "react";

import { FaQuestion } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { addEndingToWinPlace } from "../../lib/functions/helpers";
import { UserGames } from "../../components/Header/UserDropdown/UserGamesPreview";

const UserDetailGames = () => {
  const [data, setData] = useState({} as UserGames);
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState(0);
  const { slug } = useParams();

  useEffect(() => {
    const handler = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://${
            import.meta.env.VITE_BACKEND_ORIGIN
          }/user-games/${slug}?limit=10&page=${currPage}`
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
  }, [currPage]);

  return (
    <div className="mt-4 h-96">
      {isLoading ? (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-10 rounded my-2 bg-opac-w-1 animate-pulse"
            ></div>
          ))}
        </>
      ) : (
        <div className="h-full flex flex-col">
          <div className="h-full overflow-y-auto">
            <span className="text-sm text-gray-8">
              Всего игр сыграно: <strong>{data.totalGames}</strong>
            </span>
            {data.games?.map((v) => (
              <Link
                to={`/game/${v.id}`}
                className="flex items-center   my-2 hover:bg-opac-w-1  rounded px-2 py-1.5"
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
          </div>
          {data.totalGames > 10 && (
            <div className="flex mt-4 items-baseline justify-end gap-2">
              <button
                onClick={() => setCurrPage(0)}
                className={`w-8 h-8 rounded  text-sm ${
                  currPage === 0
                    ? "text-white bg-blue-6"
                    : "text-gray-10 bg-blue-4"
                }`}
              >
                1
              </button>
              {currPage > 2 && <div className="text-gray-12">...</div>}
              {Array.from({ length: Math.ceil(data.totalGames / 10) }).map(
                (_, i, arr) => (
                  <>
                    {i !== 0 && i !== arr.length - 1 && (
                      <button
                        key={i}
                        onClick={() => setCurrPage(i)}
                        className={`w-8 h-8 ${
                          i === currPage - 1 ||
                          i === currPage + 1 ||
                          i === currPage
                            ? "block"
                            : "hidden"
                        } rounded  text-sm ${
                          i === currPage
                            ? "text-white bg-blue-6"
                            : "text-gray-10 bg-blue-4"
                        }`}
                      >
                        {i + 1}
                      </button>
                    )}
                  </>
                )
              )}
              {currPage < data.totalGames / 10 - 3 && (
                <div className="text-gray-12">...</div>
              )}
              <button
                onClick={() => setCurrPage(Math.floor(data.totalGames / 10))}
                className={`w-8 h-8 rounded  text-sm ${
                  currPage === Math.floor(data.totalGames / 10)
                    ? "text-white bg-blue-6"
                    : "text-gray-10 bg-blue-4"
                }`}
              >
                {Math.ceil(data.totalGames / 10)}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDetailGames;

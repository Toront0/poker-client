import { redirect, useLoaderData } from "react-router-dom";
import Game, { GameType } from "./Game";
import { useEffect, useRef, useState } from "react";
import { useAuthState, useToaster } from "../../store/store";

import { filterGames } from "../../lib/functions/helpers";

interface IGames {
  games: GameType[];
}

const Games = ({ games }: IGames) => {
  // const data = useLoaderData() as GameType[];
  const [data, setData] = useState(games);
  const wsRef = useRef<WebSocket>();
  const authState = useAuthState((s) => s.user);
  const addToast = useToaster((s) => s.addToast);

  console.log(data);

  useEffect(() => {
    if (!wsRef.current) {
      const ws = new WebSocket("ws://localhost:3000/ws/games");
      wsRef.current = ws;

      ws.onmessage = (msg) => {
        const parsed = JSON.parse(msg.data);

        console.log("message", parsed);

        if (parsed.action === "player-in") {
          console.log("player-in");
          setData((prev) => {
            const newData = [...prev];

            const exactGameIdx = newData.findIndex(
              (v) => v.id === parsed.gameId
            );

            if (!newData[exactGameIdx].playersInRoom) {
              newData[exactGameIdx].playersInRoom = [parsed.playerId];
              console.log("newData1", newData);
              return newData;
            }

            if (
              !newData[exactGameIdx].playersInRoom.includes(parsed.playerId)
            ) {
              newData[exactGameIdx].playersInRoom.push(parsed.playerId);
            }

            return newData;
          });
        }

        if (parsed.action === "game-start") {
          setData((prev) => {
            const newData = [...prev];

            const startedGameIdx = newData.findIndex(
              (v) => v.id === parsed.gameId
            );

            newData[startedGameIdx].state = "Идет";

            return newData;
          });

          addToast({
            title: "Ваша игра началась",
            subtitle:
              "Если игра не открылась автоматически, вы сможете найте ее во вкладке 'Мои игры'",
            type: "info",
            onToastFinish() {
              console.log("onToastFinish");
              window.open(
                `game/${parsed.gameId}`,
                "_blank",
                "width=800,height=500"
              );
            }
          });
        }
      };

      ws.onopen = () => {
        console.log("connection established");
      };
    }
  }, []);

  console.log(data);

  return (
    <main className="w-full  rounded h-full flex flex-col">
      <div className="w-full text-[9px] md:text-xs lg:text-sm h-6 bg-gray-2 rounded-t grid md:grid-cols-8 grid-cols-5 items-center ">
        <div className=" h-full items-center flex col-span-2 px-1 text-gray-10 ">
          Название
        </div>
        <div className=" h-full items-center flex justify-center col-span-1  px-1 text-gray-10 border-x border-opac-w-2">
          Бай-ин
        </div>
        <div className=" h-full items-center flex justify-center  col-span-1 px-1 text-gray-10 ">
          Кол-во игроков
        </div>
        <div className=" h-full items-center flex justify-center  col-span-1 px-1 text-gray-10 border-l border-opac-w-2">
          Приз
        </div>
        <div className="  h-full items-center hidden md:flex justify-center  col-span-1 px-1 text-gray-10 border-l border-opac-w-2">
          Статус
        </div>
        <div className="  h-full items-center hidden md:flex justify-center  col-span-1 px-1 text-gray-10 border-l border-opac-w-2">
          Скорость
        </div>
        <div className=" h-full items-center hidden md:flex justify-center  col-span-1 px-2 text-gray-10 border-l border-opac-w-2">
          Состояние
        </div>
      </div>
      <section className="h-full overflow-y-auto  rounded-b">
        {filterGames(data, authState.id).map((v) => (
          <Game
            key={v.id}
            id={v.id}
            createdAt={v.createdAt}
            name={v.name}
            buyIn={v.buyIn}
            amountOfPlayers={v.amountOfPlayers}
            prize={v.prize}
            isPrivate={v.isPrivate}
            playersInRoom={v.playersInRoom}
            mode={v.mode}
            prizeDestribution={v.prizeDestribution}
            state={v.state}
            autoStart={v.autoStart}
          />
        ))}
      </section>
    </main>
  );
};

export default Games;

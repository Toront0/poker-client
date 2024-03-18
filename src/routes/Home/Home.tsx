import { Suspense } from "react";
import Games from "./Games";

import { Await, defer, useLoaderData } from "react-router-dom";
import { GameType } from "./Game";
import GamesSkeleton from "./GamesSkeleton";
import GamesLayout from "../../layouts/GamesLayout";

const d = [
  {
    id: 1,
    createdAt: new Date(),
    name: "Test",
    buyIn: 10000,
    amountOfPlayers: 2,
    prize: 20000,
    isPrivate: true,
    playersInRoom: [5],
    mode: "regular",
    prizeDestribution: "winner takes all",
    state: "Регистрация"
  },
  {
    id: 2,
    createdAt: new Date(),
    name: "Test",
    buyIn: 10000,
    amountOfPlayers: 2,
    prize: 20000,
    isPrivate: true,
    playersInRoom: [5],
    mode: "regular",
    prizeDestribution: "winner takes all",
    state: "Регистрация"
  },
  {
    id: 3,
    createdAt: new Date(),
    name: "Test",
    buyIn: 10000,
    amountOfPlayers: 2,
    prize: 20000,
    isPrivate: true,
    playersInRoom: [5],
    mode: "regular",
    prizeDestribution: "winner takes all",
    state: "Регистрация"
  }
];

export const Home = () => {
  const { data } = useLoaderData() as { data: { data: GameType[] } };

  return (
    <GamesLayout>
      <div className="w-full h-[calc(100%-40px)] ">
        <Suspense fallback={<GamesSkeleton />}>
          <Await resolve={data}>
            {(games: GameType[]) => <Games games={games} />}
          </Await>
        </Suspense>
      </div>
    </GamesLayout>
  );
};

const getGames = async () => {
  const res = await fetch("http://localhost:3000/games");

  const data = await res.json();

  return data;
};

export const loader = async () => {
  return defer({
    data: getGames()
  });
};

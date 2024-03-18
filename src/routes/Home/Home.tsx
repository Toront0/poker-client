import { Suspense } from "react";
import Games from "./Games";

import { Await, defer, useLoaderData } from "react-router-dom";
import { GameType } from "./Game";
import GamesSkeleton from "./GamesSkeleton";
import GamesLayout from "../../layouts/GamesLayout";

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

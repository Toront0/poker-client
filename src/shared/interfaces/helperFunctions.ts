export type PlayerPosition =
  | "position-0"
  | "position-1"
  | "position-2"
  | "position-3"
  | "position-4"
  | "position-5"
  | "position-6"
  | "position-7";

export type PlayerPositionFn = (
  amountOfPlayers: number,
  playerIdx: number
) => PlayerPosition;

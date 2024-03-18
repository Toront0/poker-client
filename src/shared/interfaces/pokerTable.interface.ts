export type PlayerType = {
  id: number;
  username: string;
  chips: number;
  action: string;
  status: string;
  img: string;
  time_remains: number;
  time_bank: number;
  hand: string[];
  bet: number;
  is_dealer: boolean;
  emoji: number;
  nextAction: string;
};

export interface ITable {
  id: number;
  created_at: Date;
  ante: number;
  name: string;
  min_bet: number;
  players: PlayerType[];
  flop: string[];
  turn: string;
  river: string;
  pot: number;
  winner: number[];
  potentialStreetCards: string[];
  isAllInStage: boolean;
  prize: number;
  amountOfPlayers: number;
}

export type WSResponse<T = any> = {
  action: string;
  data: T;
};

export type FinalPlayerResultType = {
  id: number;
  username: string;
  profileImg: string;
  prize: number;
  place: number;
};

export type FinalResults = {
  id: number;
  createdAt: Date;
  name: string;
  buyIn: number;
  amountOfPlayers: number;
  prize: number;
  isPrivate: boolean;
  mode: string;
  prizeDestribution: string;
  players: FinalPlayerResultType[];
};

import { ITable, PlayerType } from "./pokerTable.interface";

export type WSEmojiResponse = {
  emojiId: number;
  senderId: number;
};

export type WSRevealCardsRes = {
  data: PlayerType[];
};

export type WsGlobalChangesResponse = {
  action: string;
  data: ITable;
};

export type WSWinnerResponse = {
  action: string;
  winner: number[];
  potentialStreetCards: string[];
  kickedPlayers: number[];
};

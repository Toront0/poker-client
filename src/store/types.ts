import { ITable } from "../shared/interfaces/pokerTable.interface";

export type UserType = {
  id: number;
  username: string;
  email: string;
  isVerified: boolean;
  profileImg: string;
  money: number;
  vipFinishedAt: Date;
};

export interface IUseAuthState {
  user: UserType;
  signUp: (username: string, email: string, password: string) => void;
  login: (
    username: string,
    password: string
  ) => Promise<"wrong-username" | "invalid-password" | undefined>;
  logout: () => void;
  authenticate: () => void;
  doesEmailExist: (email: string) => Promise<boolean>;
  doesUsernameExist: (username: string) => Promise<boolean>;
  isLoading: boolean;
  setProfileImgLocally: (img: string) => void;
  addUserMoney: (amount: number) => void;
  setSubscribeLocally: (v: Date) => void;
}

export interface IUseGameState {
  data: ITable;
  setData: (v: ITable) => void;
  wsConn: WebSocket | null;
  initWSConn: (ws: WebSocket) => void;
  showedCards: string[];
  showCard: (
    cards: string,
    which: "first" | "second",
    playerId: number
  ) => void;
  showBothCard: (hand: string[], playerId: number) => void;
  resetShowedCards: () => void;
  playerRefs: HTMLDivElement[] | undefined;
  initPlayerRef: (v: HTMLDivElement) => void;
}

export type ToastType = {
  id: string;
  title: string;
  subtitle: string;
  type: "error" | "success" | "info";
  onToastFinish?: () => void;
};

type CreateToast = {
  title: string;
  subtitle: string;
  type: "error" | "success" | "info";
  onToastFinish?: () => void;
};

export interface IUseToaster {
  toasts: ToastType[];
  addToast: (req: CreateToast) => void;
  deleteToast: (id: string) => void;
}

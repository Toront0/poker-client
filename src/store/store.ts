import { create } from "zustand";
import {
  IUseAuthState,
  IUseGameState,
  IUseToaster,
  ToastType,
  AuthUser
} from "./types";
import { ITable } from "../shared/interfaces/pokerTable.interface";

export const useAuthState = create<IUseAuthState>((set, get) => ({
  user: {} as AuthUser,
  async signUp(username, email, password) {
    const res = await fetch(
      `https://${import.meta.env.VITE_BACKEND_ORIGIN}/sign-up`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password
        })
      }
    );

    if (res.status === 200) {
      const data = await res.json();

      set({ user: data });
    }

    return res;
  },
  async login(username, password) {
    const res = await fetch(
      `https://${import.meta.env.VITE_BACKEND_ORIGIN}/login`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password
        })
      }
    );

    if (res.status === 404) {
      return "wrong-username";
    }

    if (res.status === 403) {
      return "invalid-password";
    }

    const data = (await res.json()) as AuthUser;

    set({ user: data });
  },
  async logout() {
    const res = await fetch(
      `https://${import.meta.env.VITE_BACKEND_ORIGIN}/logout`,
      {
        method: "GET",
        credentials: "include"
      }
    );

    if (res.status === 200) {
      set({ user: {} as AuthUser });
    }
  },
  async authenticate() {
    try {
      const res = await fetch(
        `https://${import.meta.env.VITE_BACKEND_ORIGIN}/auth`,
        {
          method: "GET",
          credentials: "include"
        }
      );

      console.log("res", res);

      if (res.status === 200) {
        const data = await res.json();

        set({ user: data });
      }
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  async doesEmailExist(email) {
    const res = await fetch(
      `https://${import.meta.env.VITE_BACKEND_ORIGIN}/check-email/${email}`
    );

    if (res.status === 200) {
      return false;
    } else {
      return true;
    }
  },
  async doesUsernameExist(username) {
    const res = await fetch(
      `https://${
        import.meta.env.VITE_BACKEND_ORIGIN
      }/check-username/${username}`
    );

    if (res.status === 200) {
      return false;
    } else {
      return true;
    }
  },
  isLoading: true,
  setProfileImgLocally(img) {
    const newUser = { ...get().user };

    newUser.profileImg = img;

    set({ user: newUser });
  },
  addUserMoney(amount) {
    const user = { ...get().user };

    user.money += amount;

    set({ user: user });
  },
  setSubscribeLocally(v) {
    const data = { ...get().user };

    data.vipFinishedAt = v;

    set({ user: data });
  }
}));

export const useGameState = create<IUseGameState>((set, get) => ({
  data: {} as ITable,
  setData(v) {
    set({ data: v });
  },
  wsConn: null,
  initWSConn(ws) {
    set({ wsConn: ws });
  },
  showedCards: ["", ""],
  showCard(card, which, playerId) {
    const res = get().showedCards;

    if (which === "first") {
      res[0] = card;
    } else {
      res[1] = card;
    }

    get().wsConn?.send(
      JSON.stringify({
        action: "show-card",
        data: {
          playerId: playerId,
          hand: res
        }
      })
    );

    set({ showedCards: res });
  },
  showBothCard(hand, playerId) {
    get().wsConn?.send(
      JSON.stringify({
        action: "show-card",
        data: {
          playerId: playerId,
          hand: hand
        }
      })
    );

    set({ showedCards: hand });
  },
  resetShowedCards() {
    set({ showedCards: ["", ""] });
  },
  playerRefs: [],
  initPlayerRef(v) {
    set({ playerRefs: get().playerRefs?.concat(v) });
  }
}));

export const useToaster = create<IUseToaster>((set, get) => ({
  toasts: [],
  addToast(req) {
    const t: ToastType = {
      id: self.crypto.randomUUID(),
      ...req
    };

    set({ toasts: get().toasts.concat(t) });
  },
  deleteToast(id) {
    set({ toasts: get().toasts.filter((v) => v.id !== id) });
  }
}));

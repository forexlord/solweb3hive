import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  walletPublickey: string;
  credit: number;
  noOfPrompts: number;
  email: string;
  token: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      isLoggedIn: () => !!get().user,
    }),
    { name: "user", storage: createJSONStorage(() => sessionStorage) }
  )
);

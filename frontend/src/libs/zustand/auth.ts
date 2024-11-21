import { create } from "zustand";
import { TUser } from "../../utils/types";

// Define the store's state and actions
interface UserState {
  user: TUser | null;
  setUser: (user: TUser) => void;
  clearUser: () => void;
}

// Create the Zustand store
export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: TUser) => set({ user }),
  clearUser: () => set({ user: null }),
}));

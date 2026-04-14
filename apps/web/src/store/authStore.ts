import { create } from "zustand";
import type { User } from "../types/user";

type AuthState = {
  user: User | null;
  isAuthResolved: boolean;
  setUser: (user: User | null) => void;
  setAuthResolved: (resolved: boolean) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthResolved: false,
  setUser: (user) => set({ user }),
  setAuthResolved: (isAuthResolved) => set({ isAuthResolved }),
  clearUser: () => set({ user: null }),
}));
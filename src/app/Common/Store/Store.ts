import { create } from "zustand";
import {
  LogInTypes,
  SignInTypes,
  ThemeModeTypes,
  UserIdType,
} from "../Types/Types";

export const useLogInModal = create<LogInTypes>((set) => ({
  isLogIn: false,
  setIsLogIn: (value) => set(() => ({ isLogIn: value })),
}));

export const useSignInModal = create<SignInTypes>((set) => ({
  isSignIn: false,
  setIsSignIn: (value) => set(() => ({ isSignIn: value })),
}));

export const useThemeMode = create<ThemeModeTypes>((set) => ({
  nightMode: false,
  setNightMode: () => set((state) => ({ nightMode: !state.nightMode })),
}));

export const useUserId = create<UserIdType>((set) => ({
  userId: 0,
  setUserId: (value) => set(() => ({ userId: value })),
}));

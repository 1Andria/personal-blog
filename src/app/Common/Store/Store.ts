import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  CurrentIdType,
  LogInTypes,
  SignInTypes,
  ThemeModeTypes,
  UpdateModalStore,
  UpdateModalType,
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

export const useCurrentId = create<CurrentIdType>((set) => ({
  currentId: "",
  setCurrentId: (value) => set(() => ({ currentId: value })),
}));

export const useThemeMode = create<ThemeModeTypes>()(
  persist(
    (set) => ({
      nightMode: true,
      setNightMode: () => set((state) => ({ nightMode: !state.nightMode })),
    }),
    {
      name: "theme-mode",
    }
  )
);

export const useUserId = create<UserIdType>((set) => ({
  userId: "",
  setUserId: (value) => set(() => ({ userId: value })),
}));

export const useUpdateModal = create<UpdateModalStore>((set) => ({
  updateModal: false,
  setUpdateModal: (val) => set({ updateModal: val }),
  blogToUpdate: null,
  setBlogToUpdate: (blog) => set({ blogToUpdate: blog }),
}));

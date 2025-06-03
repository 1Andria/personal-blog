export type LogInTypes = {
  isLogIn: boolean;
  setIsLogIn: (value: boolean) => void;
};

export type SignInTypes = {
  isSignIn: boolean;
  setIsSignIn: (value: boolean) => void;
};

export type ThemeModeTypes = {
  nightMode: boolean;
  setNightMode: () => void;
};

export type UpdateModalType = {
  updateModal: boolean;
  setUpdateModal: (value: boolean) => void;
};

export type CurrentIdType = {
  currentId: string;
  setCurrentId: (value: string) => void;
};

export type UserIdType = {
  userId: string;
  setUserId: (value: string) => void;
};

export type BlogType = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  description: string;
  updatedAt: string;
  author: string;
};

export type UpdateModalStore = {
  updateModal: boolean;
  setUpdateModal: (val: boolean) => void;
  blogToUpdate: BlogType | null;
  setBlogToUpdate: (blog: BlogType | null) => void;
};
export type userType = {
  _id: string;
  fullName: string;
  email: string;
  blogs: string[];
  createdAt: string;
  updatedAt: string;
};

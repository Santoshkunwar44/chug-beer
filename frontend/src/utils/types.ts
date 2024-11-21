export type TUser = {
  _id: string;
  avatar?: string;
  username: string;
  password: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  owe?: number;
  lastLoggedIn?: string;
};

export type TEntry = {
  _id: string;
  title: string;
  description: string;
  userId: TUser;
  videoUrl?: string;
  updatedAt: string;
  createdAt: string;
};

export type TComment = {
  _id: string;
  text: string;
  userId: TUser;
  entryId: TEntry;
  createdAt: string;
  updatedAt: string;
};

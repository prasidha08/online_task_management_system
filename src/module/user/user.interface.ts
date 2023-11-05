export type TCreateUser = {
  email: string;
  password: string;
};

export type FriendLists = {
  name: string;
  _id: string;
};

export type TUserResponse = {
  email: string;
  name: string | null;
  _id: string;
  address: string | null;
  phoneNumber: string | null;
  createdAt: EpochTimeStamp;
  updatedAt: EpochTimeStamp | null;
  password?: string;
  friendLists: FriendLists[] | null;
};

export type TUserUpdate = {
  name?: string;
  phoneNumber?: string;
  address?: string;
  password?: string;
  updatedAt: number;
  friendLists?: FriendLists[];
};

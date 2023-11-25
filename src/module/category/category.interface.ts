export type TUserLists = {
  name: string;
  _id: string;
};

export type TRequestCategory = {
  title: string;
  userLists: TUserLists[] | null;
  updatedAt: EpochTimeStamp | null;
  createdAt: EpochTimeStamp | null;
  taskIds: string[] | null;
  description: string | null;
};

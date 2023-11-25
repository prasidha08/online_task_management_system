import { TUserLists } from "../category/category.interface";

export type ObjectValues<T> = T[keyof T];

export const STATUS = {
  COMPLETED: "COMPLETED",
  IN_PROGRESS: "IN_PROGRESS",
  TODO: "TODO",
} as const;

export const LABEL = {
  PRIORITY: "PRIORITY",
} as const;

type Label = ObjectValues<typeof LABEL>;

type Status = ObjectValues<typeof STATUS>;

export type TRequestTasks = {
  label: Label;
  title: string;
  status: Status;
  createdAt: number;
  createdBy: string;
  categoryId: string;
  description: string | null;
  userLists: TUserLists[]; // these are the person who can see the tasks
  estimatedHr: number | null;
  updatedAt: number | null;
  updatedBy: string | null;
  taskCompletedHr: number | null;
};

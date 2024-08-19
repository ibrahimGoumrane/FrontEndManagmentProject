export enum TASKACTIVITYTYPE {
  CREATE = "CREATE",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
}

export enum MEMBERACTIVITYTYPE {
  JOIN = "JOIN",
  LEAVE = "LEAVE",
}
export interface TActivity {
  activityType: TASKACTIVITYTYPE;
  userId?: string;
  oldValue?: string;
  fieldName?: string;
  newValue?: string;
  createdAt?: string;
  updatedAt?: string;
  projectId: number;
  taskId?: number;
}
export interface MActivity {
  activityType: MEMBERACTIVITYTYPE;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  projectId: number;
}
export type ActivityMap = {
  [key in TASKACTIVITYTYPE | MEMBERACTIVITYTYPE]:
    | Array<TActivity>
    | Array<MActivity>;
};

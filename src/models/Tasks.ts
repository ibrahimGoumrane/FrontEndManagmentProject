export type Id = string | number;

export interface Task {
  id: Id;
  name?: string;
  statusId?: Id;
  startDate?: string | null;
  endDate?: Date | null;
  label?: string | null;
  StoryPoint?: number | null;
  AssigneeId?: number | null;
  projectId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  parentTaskId?: number | null;
  description?: string | null;
  creatorId?: Id;
}
export interface TaskModification {
  name?: string | undefined;
  AssigneeId?: number | undefined;
  statusId?: number | undefined;
  StoryPoint?: number | undefined;
  endDate?: Date | undefined;
  description?: string | undefined;
  creatorId?: Id;
}

export interface TaskCreationCredentials {
  name: string;
}

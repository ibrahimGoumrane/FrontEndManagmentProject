export type Id = string | number;

export interface Task {
  id: Id;
  name?: string;
  statusId?: Id;
  startDate?: string | null;
  endDate?: string | null;
  label?: string | null;
  StoryPoint?: number | null;
  AssigneeId?: number | null;
  projectId?: number;
  createdAt?: string;
  updatedAt?: string;
  parentTaskId?: number | null;
  description?: string | null;
  creatorId?: Id;
}
export interface getTask {
  id: Id;
  name?: string;
  statusName?: string;
  startDate?: string | null;
  endDate?: string | null;
  StoryPoint?: number | null;
  AssigneName?: string | null;
  projectName?: string | null;
  description?: string | null;
  creatorName?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface TaskModification {
  name?: string | undefined;
  AssigneeId?: number | undefined;
  statusId?: number | undefined;
  StoryPoint?: number | undefined;
  endDate?: string | undefined;
  description?: string | undefined;
  creatorId?: Id;
}

export interface TaskCreationCredentials {
  name: string;
}

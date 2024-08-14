import { Member } from "./Users";

export type ModuleType = "TASK" | "PROJECT" | "TASKMANAGER" | "TEAM";
export type Action = "DELETE" | "UPDATE" | "CREATE";
export interface autorisationModel extends Member {
  auth: authorisation[];
}
export interface authorisation {
  id: string;
  moduleId: string;
  moduleType: ModuleType;
  action: Action;
}
export interface autorisationModelInputs {
  userId: string;
  moduleId: string;
}
export interface updateDeleteAuth {
  id: string;
  userId: string;
  moduleId: string;
}

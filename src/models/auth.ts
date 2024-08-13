export type ModuleType = "TASK" | "PROJECT" | "TASKMANAGER" | "TEAM";
export type Action = "DELETE" | "UPDATE" | "CREATE";
export interface autorisationModel {
  id: string;
  userId: string;
  moduleId: string;
  moduleType: ModuleType;
  action: Action;
  createdAt: Date;
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

import { autorisationModel } from "./auth";

export interface Project {
  id?: number;
  name?: string;
  statusId?: number;
  ManagerId?: number;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  projectImage?: string;
}
export interface getProject {
  id: number;
  name: string;
  startDate: string;
  ManagerName: string;
  description: string;
  statusName: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}
export interface ProjectCreation {
  name: string;
  description: string;
}
export interface ProjectModif {
  description?: string | undefined;
  endDate?: Date | undefined;
  name: string;
  statusId: number;
}
export interface ProjectMembers {
  authorisation: autorisationModel[];
}

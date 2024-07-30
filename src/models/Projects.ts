export interface Project {
  id?: number;
  name?: string;
  statusId?: number;
  ManagerId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}
export interface ProjectCreation {
  name: string;
  description: string;
}

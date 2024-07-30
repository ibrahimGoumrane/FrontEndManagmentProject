export type Id = string | number ;

export interface ProjectStatus {
  id: Id;
  name: string;
}

export interface TaskStatus{
  id: Id;
  name: string;
  projectId? : Id | null;

}

export interface StatusCreation {
  name: string;
}

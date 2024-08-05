import { createContext, useContext } from "react";
import { Project, ProjectModif } from "../../../models/Projects";
import { ProjectStatus, TaskStatus } from "../../../models/Status";
import { Task } from "../../../models/Tasks";
import { User } from "../../../models/Users";

// Create a context
export const ProjectContext = createContext<
  | {
      project: Project | null;
      tasks: Task[];
      projectStatus: ProjectStatus[];
      projectState: ProjectStatus | null;
      members: User[];
      taskStatus: TaskStatus[];
      updateProject: (newProject: ProjectModif | null) => Promise<void>;
      updateTasks: (Tasks: Task[], saveToDb?: boolean) => Promise<void>;
      updateMembers: (users: User[]) => Promise<void>;
      updateProjectState: (state: ProjectStatus) => Promise<void>;
      updateTaskStatus: (taskStatus: TaskStatus[]) => Promise<void>;
      resetData: () => void;
    }
  | undefined
>(undefined);
export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be within a ProjectProvider");
  }

  return context;
};

import { createContext, useContext } from "react";
import { Project } from "../../../models/Projects";
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
      updateProject: (newProject: Project | null) => void;
      updateTasks: (Tasks: Task[]) => void;
      updateMembers: (users: User[]) => void;
      updateProjectState: (state: ProjectStatus) => void;
      updateTaskStatus: (taskStatus: TaskStatus[]) => void;
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

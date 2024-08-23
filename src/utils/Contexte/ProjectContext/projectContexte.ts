import { createContext, useContext } from "react";
import { Project, ProjectModif } from "../../../models/Projects";
import { ProjectStatus, TaskStatus } from "../../../models/Status";
import { Task } from "../../../models/Tasks";
import { autorisationModel } from "../../../models/auth";
import { ActivityMap } from "../../../models/activity";

// Create a context
export const ProjectContext = createContext<
  | {
      project: Project | null;
      tasks: Task[];
      projectStatus: ProjectStatus[];
      projectState: ProjectStatus | null;
      members: autorisationModel[];
      taskStatus: TaskStatus[];
      activity: ActivityMap | undefined;
      projectImg: string;
      createTask: (newTask: Task) => Promise<void>;
      deleteTask: (newTaskId: string) => Promise<void>;
      updateTask: (
        taskId: number,
        newTask: Task,
        saveTodb?: boolean
      ) => Promise<void>;
      updatePicture: (newPicture: FileList) => Promise<void>;
      createStatus: (newTaskStatus: TaskStatus) => Promise<void>;
      deleteStatus: (newStatusId: string) => Promise<void>;
      updateStatus: (statusId: number, Status: TaskStatus) => Promise<void>;
      updateProject: (newProject: ProjectModif | null) => Promise<void>;
      updateMembers: (
        users: autorisationModel[],
        saveTodb: boolean
      ) => Promise<void>;
      updateProjectState: (state: ProjectStatus) => Promise<void>;
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

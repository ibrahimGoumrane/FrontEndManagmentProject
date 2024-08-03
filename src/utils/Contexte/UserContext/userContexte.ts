import { createContext, useContext } from "react";
import { User } from "../../../models/Users";
import { Team } from "../../../models/Teams";
import { Project } from "../../../models/Projects";
import { Task } from "../../../models/Tasks";
// Create a context
export const UserContext = createContext<
  | {
      user: User | null;
      skills: string[] | null;
      teams: Team[] | null;
      activeTasks: { assigned: Task[]; created: Task[] } | null;
      projects: Project[] | null;
      updateUser: (newUser: User | null) => Promise<void>;
      updateSkills: (skills: string[]) => Promise<void>;
      updateTeams: (teams: Team[]) => Promise<void>;
      updateActiveTasks: (
        tasks: {
          assigned: Task[];
          created: Task[];
        },
        saveToDb?: boolean
      ) => Promise<void>;
      updateProjects: (projects: Project[], saveToDb?: boolean) => Promise<void>;
      resetData: () => void;
      clearUserTasks: () => void;
    }
  | undefined
>(undefined);
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

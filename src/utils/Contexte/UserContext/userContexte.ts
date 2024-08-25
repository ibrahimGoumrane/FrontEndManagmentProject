import { createContext, useContext } from "react";
import { User } from "../../../models/Users";
import { Team } from "../../../models/Teams";
import { Project } from "../../../models/Projects";
import { Task } from "../../../models/Tasks";
import { Socket } from "socket.io-client";
// Create a context
export const UserContext = createContext<
  | {
      user: User | null;
      socket: React.MutableRefObject<Socket | undefined>;
      profilePic: string;
      skills: string[] | null;
      teams: Team[] | null;
      activeTasks: { assigned: Task[]; created: Task[] } | null;
      projects: Project[] | null;
      updateUser: (newUser: User | null) => Promise<void>;
      updateSkills: (skills: string[]) => Promise<void>;
      updateProfilePic: (newProfilePic: FileList) => Promise<void>;
      updateTeams: (teams: Team[]) => void;
      updateActiveTasks: (
        tasks: {
          assigned: Task[];
          created: Task[];
        },
        saveToDb?: boolean
      ) => Promise<void>;
      updateProjects: (
        newProject: Project[],
        saveToDb?: boolean
      ) => Promise<void>;
      resetData: () => void;
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

import { createContext, useContext } from "react";
import { Team } from "../../../models/Teams";
import { User } from "../../../models/Users";

// Create a context
export const TeamContext = createContext<
  | {
      team: Team | null;
      teamMembers: User[] | [];
      teamImg: string;
      updateTeam: (newTeam: Team) => Promise<void>;
      addMember: (newMemberId: number) => Promise<void>;
      removeMember: (newMemberId: number) => Promise<void>;
      deleteTeam: () => Promise<void>;
      resetData: () => void;
    }
  | undefined
>(undefined);
export const useTask = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTasks must be within a taskProvider");
  }

  return context;
};

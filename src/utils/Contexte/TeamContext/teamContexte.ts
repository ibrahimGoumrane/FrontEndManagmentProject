import { createContext, useContext } from "react";
import { Team, TeamMembers } from "../../../models/Teams";

// Create a context
export const TeamContext = createContext<
  | {
      team: Team | null;
      teamMembers: TeamMembers | null;
      createTeam: (newTeam: Team) => Promise<void>;
      updateTeam: (newTeam: Team) => Promise<void>;
      updateTeamMembers: (newTeamMembers: TeamMembers) => Promise<void>;
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

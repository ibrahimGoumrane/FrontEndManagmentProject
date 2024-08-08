import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Team, Id } from "../../../models/Teams.ts";
import { useUser } from "../UserContext/userContexte.ts";
import {
  saveTeam,
  getTeamById,
  getTeamMembers,
  addTeamMember,
  removeTeamMember,
  deleteTeam as deleteTeamUsingId,
} from "../../../network/TeamApi.ts";
import { User } from "../../../models/Users.ts";
import { TeamContext } from "./teamContexte.ts";

interface TaskProviderProps {
  teamId: Id;
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({
  teamId,
  children,
}) => {
  const { teams, updateTeams } = useUser();
  const [team, setTeam] = useState<Team | null>(null);

  const [teamMembers, setteamMembers] = useState<User[]>([]);

  const updateTeam = useCallback(
    async (newTeam: Team | null) => {
      if (newTeam) {
        const SavedTeam = await saveTeam(+teamId, newTeam);
        setTeam(SavedTeam);
        const newTeams = teams?.map((team) =>
          team.id == SavedTeam.id ? SavedTeam : team
        ) || [SavedTeam];
        updateTeams(newTeams);
      }
    },
    [teamId]
  );
  const addMember = useCallback(
    async (newMemberId: number) => {
      const updatedMembers = await addTeamMember(+teamId, newMemberId);
      setteamMembers(updatedMembers);
    },
    [teamId]
  );
  const removeMember = useCallback(
    async (newMemberId: number) => {
      const updatedMembers = await removeTeamMember(+teamId, newMemberId);
      setteamMembers(updatedMembers);
    },
    [teamId]
  );

  const deleteTeam = useCallback(async () => {
    const newTeams = teams?.filter((team) => +team.id !== +teamId) || [];
    await deleteTeamUsingId(+teamId);
    updateTeams(newTeams);
  }, [teamId, teams, updateTeams]);

  const resetData = useCallback(() => {
    setTeam(null);
    setteamMembers([]);
  }, []);

  useEffect(() => {
    async function fetchTeamData() {
      const teamData = await getTeamById(+teamId);
      setTeam(teamData);
      const teamMembers = await getTeamMembers(+teamId);
      setteamMembers(teamMembers);
    }
    fetchTeamData();
  }, [teamId]);

  return (
    <TeamContext.Provider
      value={{
        team,
        teamMembers,
        updateTeam,
        addMember,
        removeMember,
        deleteTeam,
        resetData,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Team } from "../../../models/Teams.ts";
import { User } from "../../../models/Users.ts";
import {
  addTeamMember,
  deleteTeam as deleteTeamUsingId,
  getTeamById,
  getTeamImg,
  getTeamMembers,
  removeTeamMember,
  saveTeam,
} from "../../../network/TeamApi.ts";
import { useUser } from "../UserContext/userContexte.ts";
import { TeamContext } from "./teamContexte.ts";

interface TeamproviderProps {
  teamId: string;
  children: ReactNode;
}

export const Teamprovider: React.FC<TeamproviderProps> = ({
  teamId,
  children,
}) => {
  const { teams, updateTeams, user } = useUser();
  const [team, setTeam] = useState<Team | null>(null);

  const [teamMembers, setteamMembers] = useState<User[]>([]);
  const [teamImg, setTeamImg] = useState<string>("");
  const updateTeam = useCallback(
    async (newTeam: Team | null) => {
      if (newTeam) {
        const SavedTeam = await saveTeam(+teamId, newTeam);
        setTeam(SavedTeam);
        const newTeams = teams?.map((team) =>
          +team.id == +SavedTeam.id ? SavedTeam : team
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
    async (newMemberId: number, saveDb = true) => {
      if (!user) return;
      if (saveDb) {
        const updatedMembers = await removeTeamMember(+teamId, newMemberId);
        setteamMembers(updatedMembers);
      } else {
        setteamMembers(
          teamMembers.filter((member) => +member.id !== +newMemberId)
        );
      }
      //check if the user is still in the team
      const inTeam = teamMembers.findIndex(
        (member) => +member.id === +user?.id
      );
      if (inTeam === -1) {
        const newTeams = teams?.filter((team) => +team.id !== +teamId) || [];
        updateTeams(newTeams);
      }
    },
    [teamId]
  );

  const deleteTeam = useCallback(async () => {
    await deleteTeamUsingId(+teamId);
    const newTeams = teams?.filter((team) => +team.id !== +teamId) || [];
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
  useEffect(() => {
    async function fetchteamImg() {
      try {
        const TeamData = await getTeamImg(+teamId);
        setTeamImg(TeamData);
        localStorage.setItem(`TeamImg${teamId}`, JSON.stringify(TeamData));
      } catch (error) {
        resetData();
      }
    }
    fetchteamImg();
  }, [resetData, teamId]);
  return (
    <TeamContext.Provider
      value={{
        team,
        teamMembers,
        teamImg,
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

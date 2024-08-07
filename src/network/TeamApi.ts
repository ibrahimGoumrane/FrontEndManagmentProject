import { Id, Team, TeamMembers } from "../models/Teams";
import { fetchData } from "./utilies";

export async function searchTeam(name: string): Promise<Team[]> {
  const response = await fetchData(`/api/teams/?name=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function getTeamById(id: number): Promise<Team> {
  const response = await fetchData(`/api/teams/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
export async function getUserTeams(id: number): Promise<Team[]> {
  const response = await fetchData(`/api/teams/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
export async function getTeamMembers(id: Id): Promise<TeamMembers[]> {
  const response = await fetchData(`/api/teams/members/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function saveTeam(id: Id, teams: Team): Promise<Team> {
  const response = await fetchData(`/api/teams/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ teams }),
  });
  return response;
}

export async function deleteTeam(id: Id) {
  const response = await fetchData(`/api/teams/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

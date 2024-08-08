import { Team } from "../models/Teams";
import { User } from "../models/Users";
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
export async function getTeamMembers(id: number): Promise<User[]> {
  const response = await fetchData(`/api/teams/members/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
export async function addTeamMember(
  TeamId: number,
  id: number
): Promise<User[]> {
  const response = await fetchData(`/api/teams/${TeamId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return response;
}
export async function removeTeamMember(
  TeamId: number,
  id: number
): Promise<User[]> {
  const response = await fetchData(`/api/teams/members/${TeamId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return response;
}
export async function saveTeam(id: number, teams: Team): Promise<Team> {
  const response = await fetchData(`/api/teams/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ teams }),
  });
  return response;
}

export async function deleteTeam(id: number) {
  const response = await fetchData(`/api/teams/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

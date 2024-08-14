import { Team, TeamData } from "../models/Teams";
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
getTeamById;
export async function getTeamById(id: number): Promise<Team> {
  const response = await fetchData(`/api/teams/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
export async function getTeamDataById(id: number): Promise<TeamData> {
  const response = await fetchData(`/api/teams/data/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
export async function getTeamByUserId(Userid: number): Promise<Team[]> {
  const response = await fetchData(`/api/teams/members/${Userid}`, {
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
export async function requestToJoin(teamData: TeamData): Promise<Team> {
  const response = await fetchData(`/api/teams/requestJoin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teamData),
  });
  return response;
}
export async function createTeam(name: string): Promise<Team> {
  const response = await fetchData(`/api/teams/createTeam`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return response;
}

//Require auth
export async function addTeamMember(
  TeamId: number,
  id: number
): Promise<User[]> {
  const response = await fetchData(`/api/teams/${TeamId}?moduleId=${TeamId}`, {
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
  const response = await fetchData(
    `/api/teams/members/${TeamId}?moduleId=${TeamId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );
  return response;
}

export async function saveTeam(id: number, team: Team): Promise<Team> {
  const response = await fetchData(`/api/teams/${id}?moduleId=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ team }),
  });
  return response;
}

export async function deleteTeam(id: number) {
  const response = await fetchData(`/api/teams/${id}?moduleId=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

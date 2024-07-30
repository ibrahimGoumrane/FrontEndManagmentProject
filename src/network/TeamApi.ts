import { Team } from "../models/Teams";
import { fetchData } from "./utilies";

export async function getTeamById(id: number): Promise<Team[]> {
  const response = await fetchData(`/api/teams/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function saveTeams(teams: Team[]) {
  const response = await fetchData(`/api/users/teams`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ teams }),
  });
  return response;
}

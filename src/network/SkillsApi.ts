import { skills } from "../models/Skills";
import { fetchData } from "./utilies";

export async function getSkillsName(userId: string): Promise<string[]> {
  const response = await fetchData(`/api/skills/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
export async function getSkills(): Promise<skills[]> {
  const response = await fetchData(`/api/skills`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
export async function saveSkills(skills: string[]) {
  const response = await fetchData(`/api/users/skills`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ skills }),
  });
  return response;
}

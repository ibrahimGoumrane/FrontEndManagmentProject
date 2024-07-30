import { Project, ProjectCreation } from "../models/Projects";
import { ProjectStatus } from "../models/Status";
import { Id } from "../models/Tasks";
import { User } from "../models/Users";
import { fetchData } from "./utilies";
export const getUserProjects = async (): Promise<Project[]> => {
  const response = await fetchData(`/api/projects/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getProjectData = async (projectId: Id): Promise<Project> => {
  const response = await fetchData(`/api/projects/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const createProject = async (
  data: ProjectCreation
): Promise<Project> => {
  const response = await fetchData(`/api/projects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};
export const updateProject = async (data: Project): Promise<Project> => {
  const response = await fetchData(`/api/projects/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};
export const deleteProject = async (id: number | string): Promise<Project> => {
  const response = await fetchData(`/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getProjectMembers = async (
  id: number | string
): Promise<User[]> => {
  const response = await fetchData(`/api/projects/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const updateProjectMembers = async (
  projectId: number | string,
  members: User[]
): Promise<User[]> => {
  const response = await fetchData(`/api/projects/user/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(members),
  });
  return response;
};

export const getProjectState = async (
  id: number | string
): Promise<ProjectStatus> => {
  const response = await fetchData(`/api/projects/status/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

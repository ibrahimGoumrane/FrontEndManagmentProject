import {
  MActivity,
  MEMBERACTIVITYTYPE,
  TActivity,
  TASKACTIVITYTYPE,
} from "../models/activity";
import { autorisationModel } from "../models/auth";
import { getProject, Project, ProjectCreation } from "../models/Projects";
import { ProjectStatus } from "../models/Status";
import { Id } from "../models/Tasks";
import { fetchData } from "./utilies";

////No need authorisation
export async function searchProjects(name: string): Promise<Project[]> {
  const response = await fetchData(`/api/projects/?search=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
export const requestJoingProject = async (id: string) => {
  return await fetchData(`/api/projects/requestJoin/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
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
export const getProjectInfo = async (projectId: Id): Promise<getProject> => {
  const response = await fetchData(`/api/projects/info/${projectId}`, {
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
  const response = await fetchData(`/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
export const getProjectMembers = async (
  id: number | string
): Promise<autorisationModel[]> => {
  const response = await fetchData(`/api/projects/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

//need For authorisations
export const updateProject = async (data: Project): Promise<Project> => {
  const response = await fetchData(
    `/api/projects/${data.id}?moduleId=${data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
};
export const getProjectImg = async (id: number | string): Promise<string> => {
  const response = await fetchData(`/api/projects/img/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const deleteProject = async (id: number | string): Promise<Project> => {
  const response = await fetchData(`/api/projects/${id}?moduleId=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const updateProjectMembers = async (
  projectId: number | string,
  members: autorisationModel[]
): Promise<autorisationModel[]> => {
  const response = await fetchData(`/api/projects/user?moduleId=${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(members),
  });
  return response;
};

//stuff related to activities
export const getActivities = async (
  projectId: number | string,
  activityType: TASKACTIVITYTYPE | MEMBERACTIVITYTYPE
): Promise<TActivity[] | MActivity[]> => {
  const response = await fetchData(
    `/api/projects/activity/${projectId}/${activityType}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

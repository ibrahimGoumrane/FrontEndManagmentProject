import {
  autorisationModel,
  autorisationModelInputs,
  updateDeleteAuth,
} from "../models/auth";
import { fetchData } from "./utilies";

////////////////////////////PROJECTAUTH

export const getProjectAuth = async (
  moduleId: string
): Promise<autorisationModel> => {
  const response = await fetchData(
    `/api/projects/auth/project?moduleId=${moduleId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const updateProjectAuth = async ({
  id,
  userId,
  moduleId,
}: updateDeleteAuth) => {
  const response = await fetchData(`/api/projects/auth/project/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, userId, moduleId }),
  });
  return response;
};

export const deleteProjectAuth = async (id: string) => {
  const response = await fetchData(`/api/projects/auth/project/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  return response;
};

////////////////////////////TASKMANGERAUTH

export const getTaskManagerAuth = async (
  moduleId: string
): Promise<autorisationModel> => {
  const response = await fetchData(
    `/api/projects/auth/taskManager?moduleId=${moduleId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const createTaskManagerAuth = async ({
  userId,
  moduleId,
}: autorisationModelInputs) => {
  const response = await fetchData(`/api/projects/auth/taskManager`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, moduleId }),
  });
  return response;
};

export const updateTaskManagerAuth = async ({
  id,
  userId,
  moduleId,
}: updateDeleteAuth) => {
  const response = await fetchData(`/api/projects/auth/taskManager/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, userId, moduleId }),
  });
  return response;
};

export const deleteTaskManagerAuth = async (id: string) => {
  const response = await fetchData(`/api/projects/auth/taskManager/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  return response;
};

////////////////////////////TASKAUTH

export const getTaskAuth = async (
  moduleId: string
): Promise<autorisationModel> => {
  const response = await fetchData(`/api/tasks/auth?moduleId=${moduleId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const createTaskPermission = async ({
  userId,
  moduleId,
}: autorisationModelInputs) => {
  const response = await fetchData(`/api/tasks/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, moduleId }),
  });
  return response;
};

export const updateTaskPermission = async ({
  id,
  userId,
  moduleId,
}: updateDeleteAuth) => {
  const response = await fetchData(`/api/tasks/auth`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, userId, moduleId }),
  });
  return response;
};

export const deleteTaskPermission = async (id: string) => {
  const response = await fetchData(`/api/tasks/auth`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return response;
};
////////////////////////////TEAMAUTH

export const getTeamAuth = async (
  moduleId: string
): Promise<autorisationModel> => {
  const response = await fetchData(`/api/teams/auth?moduleId=${moduleId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const updateTeamPermission = async ({
  id,
  userId,
  moduleId,
}: updateDeleteAuth) => {
  const response = await fetchData(`/api/teams/auth/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, userId, moduleId }),
  });
  return response;
};

export const deleteTeamPermission = async (id: string) => {
  const response = await fetchData(`/api/teams/auth/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return response;
};

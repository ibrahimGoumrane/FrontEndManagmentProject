import { ProjectStatus, TaskStatus } from "../models/Status";
import { Id } from "../models/Tasks";
import { fetchData } from "./utilies";

export const getProjectStatus = async (): Promise<ProjectStatus[]> => {
  const response = await fetchData(`/api/status/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getTaskStatus = async (projectId: Id): Promise<TaskStatus[]> => {
  const response = await fetchData(`/api/status/tasks/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const createTaskStatus = async (
  name: string,
  projectId: Id
): Promise<TaskStatus> => {
  const response = await fetchData(`/api/status/?moduleId=${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, projectId }),
  });
  return response;
};
export const updateTaskStatus = async (
  projectId: Id,
  data: TaskStatus
): Promise<TaskStatus> => {
  const response = await fetchData(
    `/api/status/tasks/${projectId}?moduleId=${projectId}`,
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
export const deleteTaskStatus = async (
  statusId: Id,
  projectId: Id
): Promise<void> => {
  const response = await fetchData(
    `/api/status/${statusId}?moduleId=${projectId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

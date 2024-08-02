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
export const saveTaskStatus = async (
  projectId: Id,
  data: TaskStatus[]
): Promise<TaskStatus[]> => {
  const response = await fetchData(`/api/status/tasks/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

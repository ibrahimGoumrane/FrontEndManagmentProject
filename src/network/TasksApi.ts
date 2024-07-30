import { Task } from "../models/Tasks";
import { fetchData } from "./utilies";
export const getActiveUserTasks = async (): Promise<{
  assigned: Task[];
  created: Task[];
}> => {
  const AssignedTask: Task[] = await fetchData(`/api/tasks/user/assigned`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const CreatedTask: Task[] = await fetchData(`/api/tasks/user/created`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    assigned: AssignedTask,
    created: CreatedTask,
  };
};
export const getProjectTasks = async (
  projectId: number | string
): Promise<Task[]> => {
  const response = await fetchData(`/api/tasks/project/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getTaskData = async (id: number | string): Promise<Task> => {
  const response = await fetchData(`/api/tasks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const createTask = async (
  title: string,
  projectId: number | string,
  statusId: number | string
): Promise<Task> => {
  const response = await fetchData(`/api/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, projectId, statusId }),
  });
  return response;
};
export const updateTask = async (data: Task): Promise<Task> => {
  const response = await fetchData(`/api/tasks/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};
export const deleteTasks = async (
  projectid: number | string
): Promise<Task[]> => {
  const response = await fetchData(`/api/tasks/${projectid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const deleteTasksUser = async (): Promise<Task[]> => {
  const response = await fetchData(`/api/tasks/user/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

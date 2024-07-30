import { Id } from "../../../../models/Status";
import { Task } from "../../../../models/Tasks";

export const clearLocalStorage = (taskId: Id) => {
  localStorage.removeItem(`comments${taskId}`);
};
export const AddTaskToLocalStorage = (
  projectId: Id,
  taskId: Id,
  taskData: Task | null
) => {
  const tasksLs = localStorage.getItem(`tasks${projectId}`);
  const tasks: Task[] = tasksLs ? JSON.parse(tasksLs) : [];
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskData) {
    if (taskIndex !== -1) {
      tasks[taskIndex] = taskData;
    } else {
      tasks.push(taskData);
    }
    localStorage.setItem(`tasks${projectId}`, JSON.stringify(tasks));
  } else {
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      localStorage.setItem(`tasks${projectId}`, JSON.stringify(tasks));
    }
  }
};

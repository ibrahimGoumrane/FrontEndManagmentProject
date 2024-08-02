import { TaskStatus } from "../../../models/Status";
import { Task, TaskModification } from "../../../models/Tasks";
import { Id } from "../types/types";

export function createNewStatus(
  status: TaskStatus[],
  setStatus: React.Dispatch<React.SetStateAction<TaskStatus[]>>,
  projectId: Id
) {
  const statusToAdd: TaskStatus = {
    id: status.length + 1,
    name: "",
    projectId,
  };
  setStatus((status) => [...status, statusToAdd]);
}
export function createTask(
  statusId: Id,
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {
  const taskToAdd: Task = {
    id: `task-${tasks.length + 1}`,
    name: "",
    statusId: statusId,
    startDate: new Date().toISOString(),
  };
  setTasks([...tasks, taskToAdd]);
}
export function updateStatus(
  id: Id,
  name: string,
  status: TaskStatus[],
  setStatus: React.Dispatch<React.SetStateAction<TaskStatus[]>>
) {
  const newStatus = status.map((stat) => {
    if (stat.id === id) {
      return { ...stat, name };
    }
    return stat;
  });
  setStatus(newStatus);
}
export function deleteStatus(
  StatusId: Id,
  status: TaskStatus[],
  setStatus: React.Dispatch<React.SetStateAction<TaskStatus[]>>,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  setErrorMsg?: React.Dispatch<React.SetStateAction<string>>
) {
  const deletedStatus = status.find((ele) => ele.id == StatusId);
  if (!deletedStatus?.projectId) {
    setErrorMsg && setErrorMsg("You cannot delete this column ");
    return;
  }

  const filteredStatus = status.filter((stat) => stat.id !== StatusId);
  setStatus(filteredStatus);
  setTasks((tasks) => tasks.filter((task) => task.statusId !== StatusId));
}
export function deleteTask(
  taskId: Id,
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {
  const filteredTask = tasks.filter((tsk) => tsk.id !== taskId);
  setTasks(filteredTask);
}
export function updateTask(
  taskId: Id,
  newTask: TaskModification,
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
): void {
  const NewTasks: Task[] = tasks.map((task) =>
    task.id == taskId ? { ...task, ...newTask } : task
  );
  setTasks(NewTasks);
}

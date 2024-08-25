import "./taskContainer.css";
import { TaskModification } from "../../../models/Tasks";
import { Id, Task } from "../../../models/Tasks";
import { TaskStatus } from "../../../models/Status";

interface ColumnContainerProps {
  state: TaskStatus;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  deleteStatus?: (
    StatusId: Id,
    status: TaskStatus[],
    deleteS: (newStatusId: string) => Promise<void>,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>
  ) => Promise<void>;
  updateStatus?: (
    id: Id,
    name: string,
    status: TaskStatus[],
    updateS: (statusId: number, Status: TaskStatus) => Promise<void>,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>
  ) => Promise<void>;
  createTask: (
    value: string,
    statusId: Id,
    tasks: Task[],
    createT: (newTask: Task) => Promise<void>,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>
  ) => Promise<void>;
  status: TaskStatus[];
  tasks: Task[];
  ownTasks: Task[];
  deleteTask: (
    taskId: Id,
    deleteT: (newTaskId: string) => Promise<void>,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>
  ) => Promise<void>;
  updateTask: (
    taskId: Id,
    newTask: TaskModification,
    tasks: Task[],
    updateT: (
      taskId: number,
      newTask: Task,
      saveTodb?: boolean
    ) => Promise<void>,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>
  ) => Promise<void>;
}

interface TaskContainerProps {
  task: Task;
  setErrorMsg?: React.Dispatch<React.SetStateAction<string>>;
  deleteTask: (
    taskId: Id,
    deleteT: (newTaskId: string) => Promise<void>,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>
  ) => Promise<void>;
  tasks: Task[];
  updateTask: (
    taskId: Id,
    newTask: TaskModification,
    tasks: Task[],
    updateT: (
      taskId: number,
      newTask: Task,
      saveTodb?: boolean
    ) => Promise<void>,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>
  ) => Promise<void>;
}
export type { ColumnContainerProps, TaskContainerProps };

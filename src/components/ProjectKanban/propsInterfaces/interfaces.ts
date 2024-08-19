import "./taskContainer.css";
import { TaskModification } from "../../../models/Tasks";
import { Id, Task } from "../../../models/Tasks";
import { TaskStatus } from "../../../models/Status";

interface ColumnContainerProps {
  state: TaskStatus;
  deleteStatus?: (
    StatusId: Id,
    status: TaskStatus[],
    deleteS: (newStatusId: string) => void,
    setErrorMsg?: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  updateStatus?: (
    id: Id,
    name: string,
    status: TaskStatus[],
    updateS: (statusId: number, Status: TaskStatus) => void
  ) => void;
  createTask: (
    value: string,
    statusId: Id,
    tasks: Task[],
    createT: (newTask: Task) => void
  ) => void;
  status: TaskStatus[];
  tasks: Task[];
  ownTasks: Task[];
  deleteTask: (taskId: Id, deleteT: (newTaskId: string) => void) => void;
  updateTask: (
    taskId: Id,
    newTask: TaskModification,
    tasks: Task[],
    updateT: (taskId: number, newTask: Task, saveTodb?: boolean) => void
  ) => void;
}

interface TaskContainerProps {
  task: Task;
  deleteTask: (taskId: Id, deleteT: (newTaskId: string) => void) => void;
  tasks: Task[];
  updateTask: (
    taskId: Id,
    newTask: TaskModification,
    tasks: Task[],
    updateT: (taskId: number, newTask: Task, saveTodb?: boolean) => void
  ) => void;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export type { ColumnContainerProps, TaskContainerProps };

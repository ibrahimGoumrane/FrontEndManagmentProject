import "./taskContainer.css";
import { TaskModification } from "../../../models/Tasks";
import { Id, Task } from "../../../models/Tasks";
import { TaskStatus } from "../../../models/Status";

interface ColumnContainerProps {
  state: TaskStatus;
  deleteStatus?: (
    StatusId: Id,
    status: TaskStatus[],
    setStatus: React.Dispatch<React.SetStateAction<TaskStatus[]>>,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    setErrorMsg?: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  updateStatus?: (
    id: Id,
    name: string,
    status: TaskStatus[],
    setStatus: React.Dispatch<React.SetStateAction<TaskStatus[]>>
  ) => void;
  createTask: (
    statusId: Id,
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  ) => void;
  status: TaskStatus[];
  setStatus: React.Dispatch<React.SetStateAction<TaskStatus[]>>;
  tasks: Task[];
  ownTasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  deleteTask: (
    taskId: Id,
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  ) => void;
  updateTask: (
    taskId: Id,
    newTask: TaskModification,
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  ) => void;
  setUpdateMade: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TaskContainerProps {
  task: Task;
  deleteTask: (
    taskId: Id,
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  ) => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  updateTask: (
    taskId: Id,
    newTask: TaskModification,
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  ) => void;
  createMode: boolean;
  setCreateMode: React.Dispatch<React.SetStateAction<boolean>>;

  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateMade: React.Dispatch<React.SetStateAction<boolean>>;
}
export type { ColumnContainerProps, TaskContainerProps };

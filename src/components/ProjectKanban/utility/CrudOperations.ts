import { TaskStatus } from "../../../models/Status";
import { Task, TaskModification } from "../../../models/Tasks";
import { Id } from "../types/types";

export function createTask(
  statusId: Id,
  tasks: Task[],
  createT: (newTask: Task) => void
) {
  const taskDescription = `Task Overview:<br>
  [Provide a brief overview of the task. Explain what needs to be done and why it is important.]<br><br>

  Acceptance Criteria:<br>
  [List the criteria that must be met for this task to be considered complete. Be as specific as possible.]<br><br>

  [Criterion 1]<br>
  [Criterion 2]<br>
  [Criterion 3]<br><br>

  Steps to Complete the Task:<br>
  [Outline the steps required to complete the task. Break it down into smaller, manageable actions.]<br><br>

  [Step 1]<br>
  [Step 2]<br>
  [Step 3]<br><br>

  Dependencies:<br>
  [List any dependencies or prerequisites for this task. Mention if this task is dependent on the completion of other tasks or requires specific resources.]<br><br>

  [Dependency 1]<br>
  [Dependency 2]`;

  const taskToAdd: Task = {
    id: tasks.length + 1,
    name: "new task",
    statusId: statusId,
    startDate: new Date().toISOString(),
    description: taskDescription,
  };
  createT(taskToAdd);
}
export function updateStatus(
  id: Id,
  name: string,
  status: TaskStatus[],
  updateS: (statusId: number, Status: TaskStatus) => void
) {
  const Newstatus = status.find((stat) => stat.id === id) as TaskStatus;
  updateS(+id, { ...Newstatus, name });
}
export function deleteStatus(
  StatusId: Id,
  status: TaskStatus[],
  deleteS: (newStatusId: string) => void,
  setErrorMsg?: React.Dispatch<React.SetStateAction<string>>
) {
  const deletedStatus = status.find((ele) => ele.id == StatusId);
  if (!deletedStatus?.projectId) {
    setErrorMsg && setErrorMsg("You cannot delete this column ");
    return;
  }
  deleteS(StatusId.toString());
}
export function deleteTask(taskId: Id, deleteT: (newTaskId: string) => void) {
  const formattedTaskId = taskId.toString().replace("task-", "");
  deleteT(formattedTaskId.toString());
}
export function updateTask(
  taskId: Id,
  newTask: TaskModification,
  tasks: Task[],
  updateT: (taskId: number, newTask: Task, saveTodb?: boolean) => void
): void {
  const formattedTaskId = taskId.toString().replace("task-", "");
  const NewTask = tasks.find((task) => task.id === formattedTaskId) as Task;
  updateT(+formattedTaskId, { ...NewTask, ...newTask });
}

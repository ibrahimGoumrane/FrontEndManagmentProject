import { TaskStatus } from "../../../models/Status";
import { Task, TaskModification } from "../../../models/Tasks";
import { Id } from "../types/types";

export async function createTask(
  value: string,
  statusId: Id,
  tasks: Task[],
  createT: (newTask: Task) => Promise<void>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
) {
  try {
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
      name: value,
      statusId: statusId,
      startDate: new Date().toISOString(),
      description: taskDescription,
    };
    await createT(taskToAdd);
  } catch (error) {
    setErrorMsg(
      "Warning :Error updating task ur changes are not being Save :" +
        (error as Error).message
    );
  }
}
export async function updateStatus(
  id: Id,
  name: string,
  status: TaskStatus[],
  updateS: (statusId: number, Status: TaskStatus) => Promise<void>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
) {
  try {
    const Newstatus = status.find((stat) => stat.id === id) as TaskStatus;
    await updateS(+id, { ...Newstatus, name });
  } catch (error) {
    setErrorMsg(
      "Warning : Ur changes are not being proccessed cause :  " +
        (error as Error).message
    );
  }
}
export async function deleteStatus(
  StatusId: Id,
  status: TaskStatus[],
  deleteS: (newStatusId: string) => Promise<void>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
) {
  try {
    const deletedStatus = status.find((ele) => ele.id == StatusId);
    if (!deletedStatus?.projectId) {
      setErrorMsg && setErrorMsg("You cannot delete this column ");
      return;
    }
    await deleteS(StatusId.toString());
  } catch (error) {
    setErrorMsg(
      "Warning : Ur changes are not being proccessed cause :  " +
        (error as Error).message
    );
  }
}
export async function deleteTask(
  taskId: Id,
  deleteT: (newTaskId: string) => Promise<void>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
) {
  try {
    const formattedTaskId = taskId.toString().replace("task-", "");
    await deleteT(formattedTaskId.toString());
  } catch (error) {
    setErrorMsg(
      "Warning : Ur changes are not being proccessed cause :  " +
        (error as Error).message
    );
  }
}
export async function updateTask(
  taskId: Id,
  newTask: TaskModification,
  tasks: Task[],
  updateT: (taskId: number, newTask: Task, saveTodb?: boolean) => Promise<void>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
): Promise<void> {
  try {
    const formattedTaskId = taskId.toString().replace("task-", "");
    const NewTask = tasks.find((task) => task.id === formattedTaskId) as Task;
    await updateT(+formattedTaskId, { ...NewTask, ...newTask });
  } catch (error) {
    setErrorMsg(
      "Warning : Ur changes are not being proccessed cause : " +
        (error as Error).message
    );
  }
}

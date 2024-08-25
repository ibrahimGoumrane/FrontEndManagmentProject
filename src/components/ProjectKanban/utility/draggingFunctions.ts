import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { getArrayIndex } from "./utilFunctions";
import { TaskStatus } from "../../../models/Status";
import { Task } from "../../../models/Tasks";

export function onDragStart(
  event: DragStartEvent,
  setActiveStatus: React.Dispatch<React.SetStateAction<TaskStatus | null>>,
  setActiveTask: React.Dispatch<React.SetStateAction<Task | null>>
) {
  if (event.active.data.current?.type === "Status") {
    const status = event.active.data.current.state;
    if (status) {
      setActiveStatus(status);
    }
  }
  if (event.active.data.current?.type === "Task") {
    const task = event.active.data.current.task;

    if (task) {
      setActiveTask(task);
    }
  }
}
export async function onDragEnd(
  event: DragEndEvent,
  tasks: Task[],
  setStatus: React.Dispatch<React.SetStateAction<TaskStatus[]>>,
  setActiveTask: React.Dispatch<React.SetStateAction<Task | null>>,
  setActiveStatus: React.Dispatch<React.SetStateAction<TaskStatus | null>>,
  updateT: (taskId: number, newTask: Task, saveTodb?: boolean) => Promise<void>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
) {
  setActiveStatus(null);
  setActiveTask(null);
  try {
    const { active, over } = event;
    if (!over) return;
    const ActiveId = active.id;
    const overId = over.id;
    const isActiveTask = active.data.current?.type === "Task";
    if (isActiveTask) {
      const newtask = active?.data?.current?.task;
      const formattedTaskId = newtask.id.toString().replace("task-", "");

      await updateT(+formattedTaskId, newtask);
    }
    if (ActiveId === overId) return;
    setStatus((status) => {
      const activeIndex = getArrayIndex(ActiveId, status);
      const overIndex = getArrayIndex(overId, status);
      return arrayMove(status, activeIndex, overIndex);
    });
  } catch (error) {
    setErrorMsg(
      "Warning :Error updating task ur changes are not being Save : " +
        (error as Error).message
    );
  }
}
export function onDragOver(
  event: DragEndEvent,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {
  const { active, over } = event;
  if (!over) return;
  const ActiveId = active.id;
  const overId = over.id;
  if (ActiveId === overId) return;

  const isActiveTask = active.data.current?.type === "Task";
  const isOverTask = over.data.current?.type === "Task";
  if (!isActiveTask) return;

  //check if you are dropping a task at the place of other task
  if (isActiveTask && isOverTask) {
    setTasks((tasks) => {
      const activeIndex = getArrayIndex(ActiveId, tasks);
      const overIndex = getArrayIndex(overId, tasks);

      tasks[activeIndex].statusId = tasks[overIndex].statusId;

      return arrayMove(tasks, activeIndex, overIndex);
    });
  }
  //Droping a task on  a column
  const isOverAcolumn = over.data.current?.type === "Status";
  if (isActiveTask && isOverAcolumn) {
    setTasks((tasks) => {
      const activeIndex = getArrayIndex(ActiveId, tasks);

      tasks[activeIndex].statusId = overId;

      return arrayMove(tasks, activeIndex, activeIndex);
    });
  }
}

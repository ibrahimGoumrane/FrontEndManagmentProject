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
export function onDragEnd(
  event: DragEndEvent,
  setStatus: React.Dispatch<React.SetStateAction<TaskStatus[]>>,
  setActiveTask: React.Dispatch<React.SetStateAction<Task | null>>,
  setActiveStatus: React.Dispatch<React.SetStateAction<TaskStatus | null>>
) {
  setActiveStatus(null);
  setActiveTask(null);
  const { active, over } = event;
  if (!over) return;
  const ActiveStatusId = active.id;
  const overColumnId = over.id;
  if (ActiveStatusId === overColumnId) return;
  setStatus((status) => {
    const activeIndex = getArrayIndex(ActiveStatusId, status);
    const overIndex = getArrayIndex(overColumnId, status);

    return arrayMove(status, activeIndex, overIndex);
  });
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
import { TaskStatus } from "../../../models/Status";
import { Task } from "../../../models/Tasks";
import { Id } from "../types/types";

export function getArrayIndex(id: Id, columns: TaskStatus[] | Task[]) {
  return columns.findIndex((ele) => ele.id == id);
}

import { createContext, useContext } from "react";
import { Task, TaskModification } from "../../../models/Tasks";
import { CommentData } from "../../../models/Comment";

// Create a context
export const TaskContext = createContext<
  | {
      task: Task | null;
      comments: CommentData[] | null;
      updateTask: (newTask: TaskModification | null) => void;
      updateComments: (comments: CommentData[]) => void;
      resetData: () => void;
    }
  | undefined
>(undefined);
export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be within a taskProvider");
  }

  return context;
};

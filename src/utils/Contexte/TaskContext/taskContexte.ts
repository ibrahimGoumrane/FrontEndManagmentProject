import { createContext, useContext } from "react";
import { Task, TaskModification } from "../../../models/Tasks";
import { commentCreation, CommentData } from "../../../models/Comment";

// Create a context
export const TaskContext = createContext<
  | {
      task: Task | null;
      comments: CommentData[];
      updateTask: (newTask: TaskModification | null) => Promise<void>;
      createComment: (
        comment: commentCreation,
        comments: CommentData[]
      ) => Promise<void>;
      updateComment: (
        commentId: string,
        comment: CommentData,
        comments: CommentData[]
      ) => Promise<void>;
      deleteComment: (
        commentId: string,
        comments: CommentData[]
      ) => Promise<void>;
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

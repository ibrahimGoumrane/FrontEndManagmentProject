import React, { ReactNode, useCallback, useEffect, useState } from "react";
import {
  commentCreation,
  CommentData,
  commentUpdate,
} from "../../../models/Comment";
import { Id, Task, TaskModification } from "../../../models/Tasks";
import {
  deleteComment as deleteCommentApi,
  getCommentByTaskId,
  updateComment as updateCommentApi,
  createComment as createCommentApi,
} from "../../../network/CommentApi";
import { TaskContext } from "./taskContexte";
import { useProject } from "../ProjectContext/projectContexte";
import { updateTask as saveTask } from "../../../network/TasksApi.ts";

interface TaskProviderProps {
  projectId: Id;
  taskId: Id;
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({
  projectId,
  taskId,
  children,
}) => {
  const { updateTask: updateT, tasks } = useProject();

  //task state declaration
  const [task, setTask] = useState<Task | null>(() => {
    if (tasks) {
      const taskData = tasks.find((task) => +task.id === +taskId);
      return taskData ? taskData : null;
    }
    return null;
  });
  const [comments, setComments] = useState<CommentData[]>([]);

  const updateTask = useCallback(
    async (newTask: TaskModification | null) => {
      if (task) {
        const TaskInfo: Task = {
          ...task,
          ...newTask,
        };
        const DbTask = await saveTask(TaskInfo, projectId.toString());
        setTask(DbTask);

        updateT(+DbTask.id, DbTask, false);
      }
    },
    [task, updateT, projectId]
  );
  const createComment = useCallback(
    async (comment: commentCreation, comments: CommentData[]) => {
      const createComment = await createCommentApi(comment);
      const commentsDb = [...comments, createComment];
      setComments(commentsDb);
    },
    []
  );
  const updateComment = useCallback(
    async (
      commentId: string,
      comment: commentUpdate,
      comments: CommentData[]
    ) => {
      const updateComment = await updateCommentApi(commentId, comment);
      const commentsDb = comments.map((comment) =>
        +comment.id === +commentId ? updateComment : comment
      );
      setComments(commentsDb);
    },
    []
  );
  const deleteComment = useCallback(
    async (commentId: string, comments: CommentData[]) => {
      await deleteCommentApi(commentId);
      const commentsDb = comments.filter(
        (comment) => +comment.id !== +commentId
      );
      setComments(commentsDb);
    },
    []
  );

  const resetData = useCallback(() => {
    setTask(null);
    setComments([]);
  }, []);

  useEffect(() => {
    async function fetchComments() {
      const commentsData: CommentData[] = await getCommentByTaskId(taskId);
      setComments(commentsData);
    }
    fetchComments();
  }, [taskId]);

  return (
    <TaskContext.Provider
      value={{
        task,
        comments,
        updateTask,
        createComment,
        updateComment,
        deleteComment,
        resetData,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

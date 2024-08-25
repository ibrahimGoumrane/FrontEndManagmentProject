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
import { AddTaskToLocalStorage, clearLocalStorage } from "./utils/utilities";
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
  const { updateTask: updateT } = useProject();

  const [task, setTask] = useState<Task | null>(() => {
    const tasksDataLS = localStorage.getItem(`tasks${projectId}`);
    const tasksData: Task[] = tasksDataLS ? JSON.parse(tasksDataLS) : [];
    if (tasksData) {
      const taskData = tasksData.find((task) => task.id === taskId);
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
        AddTaskToLocalStorage(projectId, taskId, DbTask);
      }
    },
    [task, updateT, projectId, taskId]
  );
  const createComment = useCallback(
    async (comment: commentCreation, comments: CommentData[]) => {
      const createComment = await createCommentApi(comment);
      const commentsDb = [...comments, createComment];
      setComments(commentsDb);
    },
    [taskId]
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
    [taskId]
  );
  const deleteComment = useCallback(
    async (commentId: string, comments: CommentData[]) => {
      await deleteCommentApi(commentId);
      const commentsDb = comments.filter(
        (comment) => +comment.id !== +commentId
      );
      setComments(commentsDb);
    },
    [taskId]
  );

  const resetData = useCallback(() => {
    setTask(null);
    setComments([]);
    clearLocalStorage(taskId); // This should remove related task data from local storage
  }, [taskId]);

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

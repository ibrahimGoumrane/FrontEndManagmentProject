import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { CommentData } from "../../../models/Comment";
import { Id, Task, TaskModification } from "../../../models/Tasks";
import {
  deleteComment,
  getCommentByTaskId,
  updateComment as saveComment,
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

  const [comments, setComments] = useState<CommentData[]>(() => {
    const savedComments = localStorage.getItem(`comments${taskId}`);
    return savedComments ? JSON.parse(savedComments) : [];
  });

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

  const updateComments = useCallback(
    async (commentsData: CommentData[]) => {
      await deleteComment(taskId);
      const commentsDb = await Promise.all(
        commentsData.map((comment) => saveComment(comment))
      );
      setComments(commentsDb);
      localStorage.setItem(`comments${taskId}`, JSON.stringify(commentsDb));
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
      localStorage.setItem(`comments${taskId}`, JSON.stringify(commentsData));
    }
    fetchComments();
  }, [taskId]);

  return (
    <TaskContext.Provider
      value={{
        task,
        comments,
        updateTask,
        updateComments,
        resetData,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

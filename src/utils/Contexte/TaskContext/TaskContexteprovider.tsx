import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { CommentData } from "../../../models/Comment";
import { Id, Task, TaskModification } from "../../../models/Tasks";
import {
  getCommentByTaskId,
  updateComment as saveComment,
} from "../../../network/CommentApi";
import { updateTask as saveTask } from "../../../network/TasksApi";
import { TaskContext } from "./taskContexte";
import { AddTaskToLocalStorage, clearLocalStorage } from "./utils/utilities";

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
  const [task, setTask] = useState<Task | null>(() => {
    const tasksDataLS = localStorage.getItem(`tasks${projectId}`);
    const tasksData: Task[] = tasksDataLS ? JSON.parse(tasksDataLS) : [];
    console.log(tasksData);
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
        console.log(TaskInfo);
        setTask(TaskInfo);
        await saveTask(TaskInfo);
        AddTaskToLocalStorage(projectId, taskId, TaskInfo);
      }
    },
    [task, projectId, taskId]
  );

  const updateComments = useCallback(
    async (comments: CommentData[]) => {
      setComments(comments);
      console.log(comments);
      localStorage.setItem(`comments${taskId}`, JSON.stringify(comments));
      if (comments)
        await Promise.all(comments.map((comment) => saveComment(comment)));
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
      try {
        const commentsData: CommentData[] = await getCommentByTaskId(taskId);
        setComments(commentsData);
        localStorage.setItem(`comments${taskId}`, JSON.stringify(commentsData));
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
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

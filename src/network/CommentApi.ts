import { commentCreation, CommentData, commentUpdate } from "../models/Comment";
import { Id } from "../models/Status";
import { fetchData } from "./utilies";

export const getCommentByTaskId = async (
  taskId: Id
): Promise<CommentData[]> => {
  const response = await fetchData(`/api/comments/task/${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const createComment = async (
  data: commentCreation
): Promise<CommentData> => {
  const response = await fetchData(`/api/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};
export const updateComment = async (
  commentId: Id,
  data: commentUpdate
): Promise<CommentData> => {
  const response = await fetchData(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};
export const deleteComment = async (id: Id): Promise<CommentData> => {
  const response = await fetchData(`/api/comments/task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

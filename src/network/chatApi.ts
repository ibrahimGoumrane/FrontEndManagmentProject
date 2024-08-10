import { TChat, UChat, AttachmentData } from "../models/chat.ts";
import { fetchData } from "./utilies";

export const getTeamChat = async (id: string): Promise<TChat[]> => {
  const response = await fetchData(`/api/chat/teams/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getUserChat = async (id: string): Promise<UChat[]> => {
  const response = await fetchData(`/api/chat/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getAttachment = async (id: string): Promise<UChat[]> => {
  const response = await fetchData(`/api/chat/attachment/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getAttachments = async (
  messageId: string,
  type: string
): Promise<UChat[]> => {
  const response = await fetchData(
    `/api/chat/attachment/?messageId=${messageId}&type=${type}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
export const saveTeamMessage = async (teamMessage: TChat): Promise<UChat[]> => {
  const response = await fetchData(`/api/chat/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teamMessage),
  });
  return response;
};
export const saveUserMessage = async (userMessage: UChat): Promise<UChat[]> => {
  const response = await fetchData(`/api/chat/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userMessage),
  });
  return response;
};
export const saveAttachment = async (
  attachment: AttachmentData
): Promise<UChat[]> => {
  const response = await fetchData(`/api/chat/attachment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attachment),
  });
  return response;
};

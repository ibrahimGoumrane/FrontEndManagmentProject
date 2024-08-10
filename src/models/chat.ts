export interface TChat {
  id?: string;
  teamId: string;
  userId: string;
  userName: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface UChat {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface AttachmentData {
  id: string;
  url: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

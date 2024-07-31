export interface commentCreation {
  content: string;
  taskId: number;
  userId: number;
}
export interface commentUpdate {
  content?: string;
  taskId?: number;
  userId?: number;
}
export interface commentId {
  id: string;
}
export interface CommentData {
  id: string;
  content: string;
  taskId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

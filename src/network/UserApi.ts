import { Id } from "../models/Tasks";
import * as User from "../models/Users";
import { fetchData } from "./utilies";

export const Login = async (
  credentials: User.LogInCredentials
): Promise<User.User> => {
  const response = await fetchData("/api/users/logIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response;
};
export const SignUp = async (credentials: FormData): Promise<User.User> => {
  const response = await fetchData("/api/users/signUp", {
    method: "POST",
    body: credentials,
  });
  return response;
};
export const LogOut = async (): Promise<User.User> => {
  const response = await fetchData("/api/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getLoggedInUser = async (): Promise<User.User> => {
  const response = await fetchData("/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getUserProfile = async (userId: string): Promise<string> => {
  const response = await fetchData(`/api/users/profile/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getUserData = async (id: Id): Promise<User.User> => {
  const response = await fetchData(`/api/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const deleteUser = async (id: string): Promise<User.User> => {
  const response = await fetchData(`/api/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const updateUser = async (
  updatedUser: User.User
): Promise<User.User> => {
  const response = await fetchData(`/api/users/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  return response;
};

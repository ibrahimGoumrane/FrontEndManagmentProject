export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  profileImg: File;
  skills: Array<string>;
  createdAt: string;
  updatedAt: string;
}
export interface Member {
  id: string;
  name: string;
  email: string;
}
export interface SignUpCredentials {
  skills?: Array<string>; // Provide a type argument for the Array generic type.
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  profileImg: FileList;
}
export interface LogInCredentials {
  name: string;
  password: string;
}

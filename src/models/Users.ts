export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  skills: Array<string>;
  createdAt: string;
  updatedAt: string;
}
export interface SignUpCredentials {
  skills?: Array<string>; // Provide a type argument for the Array generic type.
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
}
export interface LogInCredentials {
  name: string;
  password: string;
}

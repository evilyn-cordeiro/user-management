export interface User {
  id: number;
  email: string;
  name: string;
  type: "admin" | "default";
  password: string;
}

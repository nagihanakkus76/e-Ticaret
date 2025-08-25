import { v4 as uuidv4 } from 'uuid';
export interface UserModel {
  id?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const initialUser: UserModel = {
  id: uuidv4(),
  firstName: "",
  lastName: "",
  fullName: "",
  userName: "",
  email: "",
  password: "",
  isAdmin: false,
}

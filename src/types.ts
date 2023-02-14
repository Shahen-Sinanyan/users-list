import { type } from "os";

export interface User {
    name: string;
    phone: string;
    email: string;
    country: string;
    numberrange: number;
  }
  
export type TUsersList = User[] | [];

export interface TSortMethod  {
    byName:boolean;
    byEmail: boolean;
    fromUp: boolean;
    fromDown: boolean;
}


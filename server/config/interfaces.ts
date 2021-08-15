import { Request } from "express";
import { IUser } from "../models/userModel";

export interface INewUser {
  name: string;
  account: string;
  password: string;
}

export interface IDecodedToken {
  id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
}
export interface IGgPayload {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
}

export interface IUserParams {
  name: string;
  account: string;
  password: string;
  avatar?: string;
  type: string;
}

export interface IReqAuth extends Request {
  user?: IUser;
}
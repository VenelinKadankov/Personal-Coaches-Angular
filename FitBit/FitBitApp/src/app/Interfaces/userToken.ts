import { IUser } from "./user";

export interface IUserToken{
    user: IUser;
    token: string;
}
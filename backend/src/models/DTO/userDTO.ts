import { Request } from "express";
import { IUser } from "../user";

export interface UserRequest extends Request {
    body: {
        email: string,
        password: string
    }
}

export interface UserUpdateRequest extends Request {
    body: Partial<IUser>
}

export interface UserEmailRequest extends Request {
    body: { email: string }
}
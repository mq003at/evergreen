import { Request } from "express";
import { IUser, Role } from "../user";
import { JwtPayload } from "jsonwebtoken";
import { BaseDTO } from "./baseDTO";
import { Purpose, TokenPayload } from "../../utils/jwt";

export interface UserRequest extends Request {
    body: {
        email: string,
        password: string,
        purpose: Purpose
    }
}

export interface UserUpdateRequest extends Request {
    body: Partial<IUser>
}

export interface UserEmailRequest extends Request {
    body: { email: string }
}

export interface UserNoPassword extends BaseDTO {
    name: string
    email: string
    role: Role
}

export interface TokenResponse {
    tokenString: string
    purpose: Purpose
}

export interface UserNoPasswordResponse extends Request {
    token: TokenResponse
    user: UserNoPassword
}


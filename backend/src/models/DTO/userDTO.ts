import { Request, Response } from "express";
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

export class UserNoPassword implements BaseDTO {
    _id: number;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string
    email: string
    role: Role

    constructor(user: IUser) {
        this._id = user._id;
        this.id = user.id;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.name = user.name;
        this.email = user.email;
       this.role = user.role;
    }
}

export interface TokenResponse {
    tokenString: string
    purpose: Purpose
}

export class UserNoPasswordResponse {
    public token: TokenResponse
    public user: UserNoPassword

    constructor(token: TokenResponse, user: UserNoPassword) {
        this.token = token;
        this.user = user;
    }
}
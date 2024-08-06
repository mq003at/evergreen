import { Request } from "express";

export interface BaseDTO extends Request {
    _id: number;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
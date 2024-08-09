import { Request } from "express";

export interface BaseDTO {
    _id: number;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
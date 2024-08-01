// authorController.ts

import { BaseController } from "./baseController";
import { AuthorService } from "../services/authorService";
import { IAuthor } from "../models/author";
import { Request, Response, NextFunction } from 'express';

const authorService = new AuthorService();

export class AuthorController extends BaseController<IAuthor> {
    constructor() {
        super(authorService);
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authors = await authorService.getAll();
            res.status(200).json(authors);
        } catch (error) {
            next(error);
        }
    }
}

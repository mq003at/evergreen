// authorController.ts

import { BaseController } from "./baseController";
import { AuthorService } from "../services/authorService";
import { IAuthor } from "../models/author";

const authorService = new AuthorService();

export class AuthorController extends BaseController<IAuthor> {
    constructor() {
        super(new AuthorService());
    }
}

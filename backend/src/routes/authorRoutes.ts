// authorRoutes.ts

import { Router } from 'express';
import { AuthorController } from '../controllers/authorController'; 
import { BaseRoutes } from './baseRoutes';
import { IAuthor } from '../models/author';

class AuthorRoutes extends BaseRoutes<IAuthor> {
    constructor() {
        super(new AuthorController());
    }
}

const authorRoutes = new AuthorRoutes();
export default authorRoutes.router;

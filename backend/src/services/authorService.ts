import Author, { IAuthor } from '../models/author';
import { BaseService } from './baseService';

export class AuthorService extends BaseService<IAuthor> {
    constructor() {
        super(Author);
    }

    async getAll(): Promise<IAuthor[]> {
        return await Author.find();
    }
}

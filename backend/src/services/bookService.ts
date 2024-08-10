import mongoose from 'mongoose';
import Book, { IBook } from '../models/book';
import { BaseService } from './baseService';
import { LoanService } from './loanService';

export class BookService extends BaseService<IBook> {
    private loanService: LoanService;
    constructor() {
        super(Book);
        this.loanService = new LoanService();
    }

    async delete(id: string): Promise<IBook | null> {
        try {
            await this.loanService.deleteAllFromBookId(id);
            const deletedBook = await this.model.findByIdAndDelete(id);
            return deletedBook;
        } catch(err) {
            const error = err as Error;
            throw new Error(`Failed to delete Book: ${error.message}`) 
        }
    }
}
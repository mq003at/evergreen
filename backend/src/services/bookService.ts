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
        const deleteSession = await mongoose.startSession();
        deleteSession.startTransaction();

        try {
            await this.loanService.deleteAllFromBookId(id);
            const deletedBook = await this.model.findByIdAndDelete(id).session(deleteSession);

            await deleteSession.commitTransaction();
            deleteSession.endSession();
            return deletedBook;
        } catch(err) {
            const error = err as Error;
            await deleteSession.abortTransaction();
            deleteSession.endSession();
            throw new Error(`Failed to delete Book: ${error.message}`) 
        }
    }
}
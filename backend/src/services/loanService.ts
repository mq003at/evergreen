import Loan, { ILoan } from '../models/loan';
import { BaseService } from './baseService';
import { Document, Types } from 'mongoose';

export class LoanService extends BaseService<ILoan> {
    constructor() {
        super(Loan);
    }

    async findByUserId(userId: string): Promise<ILoan[] | null> {
        return await this.model.find({ userId }).exec();
    }

    async deleteAllFromUserId(userId: string): Promise<ILoan[] | null> {
        const loanDocs = await this.model.find({ userId }).exec();
        // This is just an array, not a Loan Document Collection
        await this.model.deleteMany({ userId }).exec();
        return loanDocs;
    }

    async deleteAllFromBookId(bookId: string): Promise<ILoan[] | null> {
        const loanDocs = await this.model.find({ bookId }).exec();
        await this.model.deleteMany({ bookId }).exec();
        return loanDocs;
    }
}
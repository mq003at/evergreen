import Loan, { ILoan } from '../models/loan';
import { BaseService } from './baseService';
import { Document, Types } from 'mongoose';

export class LoanService extends BaseService<ILoan> {
    constructor() {
        super(Loan);
    }

    async deleteAllFromUserId(userId: string): Promise<ILoan[] | null> {
        const loanDocs = await this.model.find({ userId }).exec() as (Document<unknown, {}, ILoan> & ILoan & { _id: Types.ObjectId })[];
        // This is just an array, not a Loan Document Collection
        await this.model.deleteMany({ userId }).exec();
        return loanDocs;
    }

    async deleteAllFromBookId(bookId: string): Promise<ILoan[] | null> {
        const loanDocs = await this.model.find({ bookId }).exec() as (Document<unknown, {}, ILoan> & ILoan & { _id: Types.ObjectId })[];
        await this.model.deleteMany({ bookId }).exec();
        return loanDocs;
    }
}
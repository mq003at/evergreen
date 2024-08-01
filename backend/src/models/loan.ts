import mongoose, { Schema, Document } from 'mongoose';
import BaseModel, { IBaseModel } from './base';
import { autoIncrementId } from '../middlewares/autoIncrement';

export interface ILoan extends IBaseModel {
    book: mongoose.Types.ObjectId; // Reference to Book model
    user: mongoose.Types.ObjectId; // Reference to User model
    loanDate: Date;
    returnDate: Date;
}

const loanSchema: Schema<ILoan> = new Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    loanDate: { type: Date, required: true },
    returnDate: { type: Date, required: true }
});

// Inherit from BaseModel schema
loanSchema.add(BaseModel.schema.obj);

const Loan = mongoose.model<ILoan>('Loan', loanSchema);
export default Loan;

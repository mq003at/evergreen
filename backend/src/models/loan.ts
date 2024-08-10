import mongoose, { Schema, Document, Query } from 'mongoose';
import BaseModel, { IBaseModel } from './base';
import { autoIncrementId } from '../middlewares/autoIncrement';

export interface ILoan extends IBaseModel {
    bookId: mongoose.Types.ObjectId; // Reference to Book model
    userId: mongoose.Types.ObjectId; // Reference to User model
    loanDate: Date;
    returnDate: Date;
}

export const loanSchema: Schema<ILoan> = new Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    loanDate: { type: Date, required: true },
    returnDate: { type: Date, required: true }
});

// Inherit from BaseModel schema
loanSchema.add(BaseModel.schema.obj);

// Loan's population
loanSchema.pre(/^find/, function (next) {
    const query = this as Query<Document<ILoan>[], Document<ILoan>>;
    query.populate('bookId')
    next();
});

loanSchema.post('save', async function(doc, next) {
    await doc.populate('bookId');
    next();
})

const Loan = mongoose.model<ILoan>('Loan', loanSchema);
export default Loan;

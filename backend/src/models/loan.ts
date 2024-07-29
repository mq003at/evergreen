import mongoose, { Document, Schema } from 'mongoose';

export interface ILoan extends Document {
    userid: mongoose.Types.ObjectId;
    bookId: mongoose.Types.ObjectId;
    loanDate: Date;
    returnDate: Date;
};

const loanSchema: Schema = new Schema({
    userid: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Types.ObjectId, ref: 'Book', required: true },
    loanDate: { type: Date}, 
    returnDate: { type: Date }
});

const Loan = mongoose.model<ILoan>('Loan', loanSchema);
export default Loan;
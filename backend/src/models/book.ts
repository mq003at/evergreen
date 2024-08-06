import mongoose, { Schema } from 'mongoose';
import BaseModel, { IBaseModel } from './base';
import { autoIncrementId } from '../middlewares/autoIncrement';

export interface IBook extends IBaseModel {
    title: string;
    author: mongoose.Types.ObjectId; // Reference to Author model
    category: mongoose.Types.ObjectId;
    publishedDate: Date;
}

const bookSchema: Schema<IBook> = new Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    category: { type: mongoose.Schema.Types.ObjectId },
    publishedDate: { type: Date, required: true }
});

// Inherit from BaseModel schema
bookSchema.add(BaseModel.schema.obj);
bookSchema.pre('save', autoIncrementId);

const Book = mongoose.model<IBook>('Book', bookSchema);
export default Book;

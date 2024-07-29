import mongoose, { Schema, Document } from 'mongoose';
import BaseModel, { IBaseModel } from './base';
import { autoIncrementId } from '../middlewares/autoIncrement';

export interface IBook extends IBaseModel {
    title: string;
    author: mongoose.Types.ObjectId; // Reference to Author model
    genre: string;
    publishedDate: Date;
}

const bookSchema: Schema<IBook> = new Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    genre: { type: String, required: true },
    publishedDate: { type: Date, required: true }
});

// Apply the auto-increment ID middleware
bookSchema.pre('save', autoIncrementId);

// Inherit from BaseModel schema
bookSchema.add(BaseModel.schema.obj);

const Book = mongoose.model<IBook>('Book', bookSchema);
export default Book;

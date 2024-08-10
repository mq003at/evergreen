import mongoose, { Schema, Document, Query } from 'mongoose';
import BaseModel, { IBaseModel } from './base';
import { autoIncrementId } from '../middlewares/autoIncrement';
import { NextFunction } from 'express';

export interface IBook extends IBaseModel {
    title: string;
    author: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
    publishedDate: Date;
    price: number;
}

const bookSchema: Schema<IBook> = new Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    publishedDate: { type: Date, required: true },
    price: { type: Number, required: true }
});

// Inherit from BaseModel schema
bookSchema.add(BaseModel.schema.obj);
bookSchema.pre('save', autoIncrementId);

// Population (adding references in ASP)
bookSchema.pre(/^find/, function (next) {
    const query = this as Query<Document<IBook>[], Document<IBook>>;
    query.populate('category').populate('author');
    next();
});

bookSchema.post('save', async function(doc, next) {
    await doc.populate('category');
    await doc.populate('author');
    next();
})

const Book = mongoose.model<IBook>('Book', bookSchema);
export default Book;

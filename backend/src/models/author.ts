import mongoose, { Schema, Document } from 'mongoose';
import BaseModel, { IBaseModel } from './base';
import { autoIncrementId } from '../middlewares/autoIncrement';

export interface IAuthor extends IBaseModel {
    name: string;
    bio: string;
}

const authorSchema: Schema<IAuthor> = new Schema({
    name: { type: String, required: true },
    bio: { type: String, required: true }
});

// Apply the auto-increment ID middleware
authorSchema.pre('save', autoIncrementId);

// Inherit from BaseModel schema
authorSchema.add(BaseModel.schema.obj);

const Author = mongoose.model<IAuthor>('Author', authorSchema);
export default Author;

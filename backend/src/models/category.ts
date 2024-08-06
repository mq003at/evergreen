import mongoose, { Schema } from 'mongoose';
import BaseModel, { IBaseModel } from './base';
import { autoIncrementId } from '../middlewares/autoIncrement';

export interface ICategory extends IBaseModel {
    name: string;
    description: string;
}

const categorySchema: Schema<ICategory> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

// Inherit from BaseModel schema
categorySchema.add(BaseModel.schema.obj);
categorySchema.pre('save', autoIncrementId);

// Create the Category model
const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;

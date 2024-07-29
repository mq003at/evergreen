import mongoose, { Schema, Document, Model } from 'mongoose';
import { setUpdatedAtOnUpdate } from '../middlewares/timeStamp';

export interface IBaseModel extends Document {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

// Define a generic base schema
const baseSchema: Schema<IBaseModel> = new Schema({
    id: { type: Number, unique: true },
    createdAt: { type: Date, default: Date.now, immutable: true },
    updatedAt: { type: Date, default: Date.now }
});

// Apply the setUpdatedAtOnUpdate middleware
setUpdatedAtOnUpdate(baseSchema);

// Create a BaseModel (not typically used directly, but as a base class)
const BaseModel = mongoose.model<IBaseModel>('BaseModel', baseSchema);

export default BaseModel;

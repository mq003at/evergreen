import mongoose, { Schema, Document } from 'mongoose';
import { setUpdatedAtOnUpdate } from '../middlewares/timeStamp';
import { autoIncrementId } from '../middlewares/autoIncrement';

/*
* MongoDb treats data as Dynamic JSON object called Document.
* It contains 2 parts: Fields (id, name, etc.) and Mongoose Method: .save, .remove, .update, etc.
* Other methods can be implemented into the document interface.
* Because the Document is DYNAMIC, if we need to access any of the field, we need to declare in the interface
*   so the backend understands that the field must/may not be existed. 
*/

export interface IBaseModel extends Document {
    _id: number;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

/* Used for increment. Update and createdAt does not need because 
* createdAt is added from constructor, and updatedAt is just a modification before
* data is added into the database.
*/
export interface IBaseDocument extends Document {
    _id: number;
    id: number;
}

// Define a generic base schema
const baseSchema: Schema<IBaseModel> = new Schema({
    _id: { type: Number, unique: true },
    id: { type: Number, unique: true },
    createdAt: { type: Date, default: Date.now, immutable: true },
    updatedAt: { type: Date, default: Date.now }
});

// Apply autoincrement
baseSchema.pre('save', autoIncrementId);

// Apply the setUpdatedAtOnUpdate middleware
setUpdatedAtOnUpdate(baseSchema);

// Create a BaseModel (not typically used directly, but as a base class)
const BaseModel = mongoose.model<IBaseModel>('BaseModel', baseSchema);

export default BaseModel;

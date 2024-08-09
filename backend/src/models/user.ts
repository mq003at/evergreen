import mongoose, { Schema, Document, Model, Mongoose, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import BaseModel, { IBaseModel } from './base';
import { autoIncrementId } from '../middlewares/autoIncrement';
import { ICart } from './cart';

/*
* Custom type for Mongoose Document, User version.
* Note that for MongoDb, the data entry is DYNAMIC, meaning there could be more fields than what we declared in schema. Like, just add them in.
* By defining IUserDocument, I declare that no matter what, there would be a password field in the Document
*/

export type Role = 'Admin' | 'User'

export interface IUserDocument extends Document {
    password: string;
}

// Extend the IBaseModel to include common fields
export interface IUser extends IBaseModel {
    name: string;
    email: string;
    password: string;
    role: Role;
    cart:  Types.ObjectId | ICart;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart:  { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' }
});

// Apply the password hashing middleware
// Removed. Use service layer to hash the password
// userSchema.pre<IUser>('save', hashPassword);

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// Apply the `deleteCartOnUserRemove` middleware
// userSchema.post('findOneAndDelete', handleUserCart.deleteCartOnUserRemove);
// userSchema.post('deleteOne', handleUserCart.deleteCartOnUserRemove);

// Inherit from BaseModel schema
userSchema.add(BaseModel.schema.obj);
userSchema.pre('save', autoIncrementId);

const User = mongoose.model<IUser>('User', userSchema);
export default User;

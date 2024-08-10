import mongoose, { Schema, Document, Model, Mongoose, Types, Query } from 'mongoose';
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
    cart:  { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// Inherit from BaseModel schema
userSchema.add(BaseModel.schema.obj);
userSchema.pre('save', autoIncrementId);

// Loan's population
userSchema.pre(/^find/, function (next) {
    const query = this as Query<Document<IUser>[], Document<IUser>>;
    query.populate('bookId')
    next();
});

userSchema.post('save', async function(doc, next) {
    await doc.populate('bookId');
    next();
})

const User = mongoose.model<IUser>('User', userSchema);
export default User;

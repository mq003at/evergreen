import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import BaseModel, { IBaseModel } from './base';
import { autoIncrementId } from '../middlewares/autoIncrement';

// Extend the IBaseModel to include common fields
export interface IUser extends IBaseModel {
    name: string;
    email: string;
    password: string;
    role: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'member' }
});

// Let Bcrypt hash the passwords before saving
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err as mongoose.CallbackError);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// Apply the auto-increment ID middleware
userSchema.pre('save', autoIncrementId);

// Inherit from BaseModel schema
userSchema.add(BaseModel.schema.obj);

const User = mongoose.model<IUser>('User', userSchema);
export default User;

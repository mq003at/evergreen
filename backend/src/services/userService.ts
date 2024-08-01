import mongoose from 'mongoose';
import User, { IUser } from '../models/user';
import bcrypt from 'bcrypt';
import { deleteCart } from './cartService';

export const getAllUsers = async (): Promise<IUser[]> => {
    return await User.find();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
    return await User.findById(id);
};

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    const user = new User({ ...userData, password: hashedPassword });
    return await user.save();
};

export const updateUser = async (id: string, userData: Partial<IUser>): Promise<IUser | null> => {
    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }
    return await User.findByIdAndUpdate(id, userData, { new: true });
};

export const deleteUser = async (id: string): Promise<string> => {
    // Use session to make sure that the operation is in order
    const deleteSession = await mongoose.startSession();
    deleteSession.startTransaction();
    
    try {
        // Find the user to delete
        const user = await User.findById(id).session(deleteSession);
        if (!user) {
            throw new Error('User not found');
        }

        await deleteCart(id);
        await User.findByIdAndDelete(id).session(deleteSession);

        await deleteSession.commitTransaction()
        deleteSession.endSession();

        return `User with ID ${id} has been deleted` 
    } catch(err) {
        const error = err as Error;
        await deleteSession.abortTransaction();
        deleteSession.endSession();
        throw new Error(`Failed to delete User: ${error.message}`);
    }

};
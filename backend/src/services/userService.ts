import User, { IUser } from '../models/user';
import bcrypt from 'bcrypt';

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

export const deleteUser = async (id: string): Promise<IUser | null> => {
    return await User.findByIdAndDelete(id);
};
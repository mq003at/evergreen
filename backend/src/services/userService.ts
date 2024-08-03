import mongoose from "mongoose";
import User, { IUser } from "../models/user";
import { BaseService } from "./baseService";
import bcrypt from 'bcrypt';
import { CartService } from './cartService';
import Loan from "../models/loan";
import { LoanService } from "./loanService";

export class UserService {
    private cartService: CartService;
    private loanService: LoanService;

    constructor() {
        this.cartService = new CartService();
        this.loanService = new LoanService();
    }

    async getAll(): Promise<null> {
        throw new Error('Unable to get all the Users.')
    }

    async register(email: string, password: string): Promise<IUser> {
        const hashedPassword = await bcrypt.hash(password!, 10);
        const user = new User({ ...{
            name: 'Annonymous User',
            email: email,
            role: 'User',
        }, password: hashedPassword });
        return await user.save();
    }

    async login(email: string, password: string): Promise<IUser | null> {
        const user = await User.findOne({ email }).exec();
        if (user) {
            const isUser = await bcrypt.compare(password, user.password);
            if (isUser) return user;
            else throw new Error(`Invalid password.`)
        }
        throw new Error('Invalid email.');
    }

    async isRegistered(email: string): Promise<boolean | null> {
        if (await User.findOne({ email }).exec()) return true;
        else return false;
    }

    async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        return await this.update(id, userData);
    }

    async delete(id: string): Promise<IUser | null> {
        const deleteSession = await mongoose.startSession();
        deleteSession.startTransaction();

        try {
            const user = await User.findById(id).session(deleteSession);
            if (!user) {
                throw new Error('User not found');
            }
            
            // we use this instead of Cart.
            await this.cartService.delete(user._id.toString());
            await this.loanService.delete(user._id.toString());
            const deletedUser = User.findByIdAndDelete(id).session(deleteSession);

            await deleteSession.commitTransaction();
            deleteSession.endSession();

            return deletedUser;
        } catch (err) {
            const error = err as Error;
            await deleteSession.abortTransaction();
            deleteSession.endSession();
            throw new Error(`Failed to delete User: ${error.message}`);
        }
    }
}
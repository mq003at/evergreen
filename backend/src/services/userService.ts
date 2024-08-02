import mongoose from "mongoose";
import User, { IUser } from "../models/user";
import { BaseService } from "./baseService";
import bcrypt from 'bcrypt';
import { CartService } from './cartService';
import Loan from "../models/loan";
import { LoanService } from "./loanService";

export class UserService extends BaseService<IUser> {
    private cartService: CartService;
    private loanService: LoanService;

    constructor() {
        super(User);
        this.cartService = new CartService();
        this.loanService = new LoanService();
    }

    async getAll(): Promise<null> {
        throw new Error('Unable to get all the Users.')
    }

    async create(userData: Partial<IUser>): Promise<IUser> {
        const hashedPassword = await bcrypt.hash(userData.password!, 10);
        const user = new User({ ...userData, password: hashedPassword });
        return await user.save();
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
            const user = await this.model.findById(id).session(deleteSession);
            if (!user) {
                throw new Error('User not found');
            }
            
            // we use this instead of Cart.
            await this.cartService.delete(user._id.toString());
            await this.loanService.delete(user._id.toString());
            const deletedUser = this.model.findByIdAndDelete(id).session(deleteSession);

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
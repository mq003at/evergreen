import mongoose from "mongoose";
import User, { IUser } from "../models/user";
import { BaseService } from "./baseService";
import bcrypt from 'bcrypt';
import { CartService } from './cartService';
import Loan from "../models/loan";
import { LoanService } from "./loanService";
import { Purpose } from "../utils/jwt";
import { UserNoPasswordResponse } from "../models/DTO/userDTO";

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

    async register(email: string, password: string, purpose: Purpose): Promise<UserNoPasswordResponse> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name: 'Anonymous User',
            email,
            password: hashedPassword,
            role: 'User',
        });

        const savedUser = await user.save();
        const userNoPassword: UserNoPassword = {
            _id: savedUser._id,
            id: savedUser.id,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role,
        };
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
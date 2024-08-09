import mongoose, { Types } from "mongoose";
import User, { IUser } from "../models/user";
import { BaseService } from "./baseService";
import bcrypt from 'bcrypt';
import { CartService } from './cartService';
import Loan from "../models/loan";
import { LoanService } from "./loanService";
import { generateToken, Purpose } from "../utils/jwt";
import { UserNoPassword, UserNoPasswordResponse } from "../models/DTO/userDTO";
import Cart, { ICart } from "../models/cart";

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

    async register(email: string, password: string, purpose: Purpose, isAdmin: boolean): Promise<UserNoPasswordResponse | null> {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                name: "Anonymous User",
                email,
                password: hashedPassword,
                role: isAdmin ? 'Admin' : 'User'
            })

            const savedUser = await user.save({ session });

            const cart = new Cart({ user: savedUser._id });
            const savedCart = await cart.save({ session });

            savedUser.cart = savedCart._id as unknown as Types.ObjectId;
            await savedUser.save({ session });

            const tokenString = generateToken(savedUser._id, 'User', purpose);
            const userNoPassword = new UserNoPassword(savedUser);
            const userNoPasswordResponse: UserNoPasswordResponse = {
                token: {
                    tokenString: tokenString,
                    purpose: purpose
                },
                user: userNoPassword
            }
            return userNoPasswordResponse;
        } catch (err) {
            await session.abortTransaction();
            return null;
        } finally {
            session.endSession();
        }
    }

    async login(email: string, password: string, purpose: Purpose): Promise<UserNoPasswordResponse | 'Incorrect Password' | 'Invalid Email'> {
        const user = await User.findOne({ email }).exec();
        if (user) {
            const isUser = await bcrypt.compare(password, user.password);
            if (!isUser) return 'Incorrect Password';
            else {
                const tokenString = generateToken(user._id, 'User', purpose);
                const userNoPasswordResponse: UserNoPasswordResponse = {
                    token: {
                        tokenString: tokenString,
                        purpose: purpose
                    },
                    user: user
                };
                return userNoPasswordResponse
            };
        }
        return 'Invalid Email'
    }

    async isRegistered(email: string): Promise<boolean | null> {
        if (await User.findOne({ email }).exec()) return true;
        else return false;
    }

    async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        return await User.findByIdAndUpdate(id, userData, { new: true }).exec();
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
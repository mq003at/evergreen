import mongoose from 'mongoose';
import Cart, { ICart } from '../models/cart';
import CartItem from '../models/cartItem';
import { BaseService } from './baseService';

export class CartService extends BaseService<ICart> {
    constructor() {
        super(Cart);
    }

    async delete(id: string): Promise<ICart | null> {
        const deleteSession = await mongoose.startSession();
        deleteSession.startTransaction();

        try {
            const cart = await Cart.findOne({ id }).session(deleteSession);
            if (!cart) {
                throw new Error ('Cart not found');
            }

            await CartItem.deleteMany({ cartId: cart._id }).session(deleteSession);
            const deletedCart = await Cart.findByIdAndDelete(cart._id).session(deleteSession);
            await deleteSession.commitTransaction();
            deleteSession.endSession();
            
            return deletedCart;
        }
            catch(err) {
                const error = err as Error;
                await deleteSession.abortTransaction();
                deleteSession.endSession();
                throw new Error('Failed to delete Cart.')
            }
        }
    }

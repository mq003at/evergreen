import mongoose from 'mongoose';
import Cart, { ICart } from '../models/cart';
import CartItem from '../models/cartItem';
import { BaseService } from './baseService';

export class CartService extends BaseService<ICart> {
    constructor() {
        super(Cart);
    }

    async delete(id: string): Promise<ICart | null> {

        try {
            const cart = await Cart.findOne({ id })
            if (!cart) {
                throw new Error ('Cart not found');
            }

            await CartItem.deleteMany({ cartId: cart._id })
            const deletedCart = await Cart.findByIdAndDelete(cart._id)

            return deletedCart;
        }
            catch(err) {
                const error = err as Error;
                throw new Error('Failed to delete Cart.')
            }
        }
    }

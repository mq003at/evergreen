import Cart, { ICart } from '../models/cart';
import CartItem, { ICartItem } from '../models/cartItem';

export const getCartByUserId = async (userId: string): Promise<ICart | null> => {
    return await Cart.findOne({ userId }).populate('items.bookId');
};

export const addToCart = async (userId: string, bookId: string): Promise<ICartItem> => {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId });
        await cart.save();
    }

    const cartItem = new CartItem({ cartId: cart._id, bookId });
    return await cartItem.save();
};

export const removeFromCart = async (userId: string, bookId: string): Promise<ICartItem | null> => {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
        throw new Error('Cart not found');
    }

    return await CartItem.findOneAndDelete({ cartId: cart._id, bookId });
};

export const clearCart = async (userId: string): Promise<void> => {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
        throw new Error('Cart not found');
    }

    await CartItem.deleteMany({ cartId: cart._id });
}
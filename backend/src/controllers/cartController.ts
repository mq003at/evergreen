import { Request, Response } from 'express';
import { getCartByUserId, addToCart, removeFromCart, clearCart } from '../services/cartService';


export const getCartByUserIdHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const cart = await getCartByUserId(req.params.userId);
        if (!cart) {
            res.status(404).send('Cart not found');
            return;
        }
        res.json(cart);
    } catch (err) {
        const error = err as Error;
        res.status(500).send(error.message);
    }
};

export const addToCartHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const cartItem = await addToCart(req.params.userId, req.body.bookId);
        res.status(201).json(cartItem);
    } catch (err) {
        const error = err as Error;
        res.status(400).send(error.message);
    }
};

export const removeFromCartHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const cartItem = await removeFromCart(req.params.userId, req.body.bookId);
        if (!cartItem) {
            res.status(404).send('Item not found in cart');
            return;
        }
        res.send('Item removed from cart');
    } catch (err) {
        const error = err as Error;
        res.status(500).send(error.message);
    }
};

export const clearCartHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        await clearCart(req.params.userId);
        res.send('Cart cleared');
    } catch (err) {
        const error = err as Error;
        res.status(500).send(error.message);
    }
};

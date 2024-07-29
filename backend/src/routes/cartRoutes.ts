import express from 'express';
import {
    getCartByUserIdHandler,
    addToCartHandler,
    removeFromCartHandler,
    clearCartHandler
} from '../controllers/cartController';

const router = express.Router();

router.get('/:userId', getCartByUserIdHandler);
router.post('/:userId/add', addToCartHandler);
router.delete('/:userId/remove', removeFromCartHandler);
router.delete('/:userId/clear', clearCartHandler);

export default router;
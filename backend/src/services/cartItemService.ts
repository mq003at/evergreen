import CartItem, { ICartItem } from '../models/cartItem';
import { BaseService } from './baseService';

export class CartItemService extends BaseService<ICartItem> {
    constructor() {
        super(CartItem);
    }
}
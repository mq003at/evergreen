import { ICartItem } from "../models/cartItem";
import { CartItemService } from "../services/cartItemService";
import { BaseController } from "./baseController";

export class CartItemController extends BaseController<ICartItem> {
    constructor() {
        super(new CartItemService())
    }
}
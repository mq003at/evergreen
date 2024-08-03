import { ICart } from "../models/cart";
import { CartService } from "../services/cartService";
import { BaseController } from "./baseController";

export class CartController extends BaseController<ICart> {
    constructor(){
        super(new CartService())
    }
}
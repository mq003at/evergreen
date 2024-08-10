import { Request, NextFunction, Response } from "express";
import { ICartItem } from "../models/cartItem";
import { CartItemService } from "../services/cartItemService";
import { BaseController } from "./baseController";

export class CartItemController extends BaseController<ICartItem> {
    public cartItemService: CartItemService;

    constructor() {
        super(new CartItemService())
        this.cartItemService = new CartItemService()
    }

    public async readByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        try {
            const cartItems = this.cartItemService.findByUserId(id);
            res.status(200).json(cartItems);
        } catch (error) {
            res.status(500).json({ message: "Something wrong. Please retry later. "});
        }
    } 
}
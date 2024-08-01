import { NextFunction } from "express";
import CartItem from "../../models/cartItem";
import { ICart } from '../../models/cart';
import { CallbackError } from "mongoose";

/*
* https://mongoosejs.com/docs/api/model.html#Model.deleteMany()
*/

// In service layer

// export const deleteCartItemsOnCartRemove = async function (this: ICart, next: NextFunction) {
//     try {
//         // Query All the CartItems that has cartId = Cart._id,
//         await CartItem.deleteMany({ _id: { $in: this.items } });
//         next();
//     } catch (error) {
//         next(error as CallbackError);
//     }
// };
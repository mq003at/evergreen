import mongoose, { Schema } from 'mongoose';
import BaseModel, { IBaseModel } from './base';
import { autoIncrementId } from '../middlewares/autoIncrement';

export interface ICartItem extends IBaseModel {
    cartId: mongoose.Types.ObjectId;
    bookId: mongoose.Types.ObjectId;
    quantity: number;
}

const cartItemSchema: Schema<ICartItem> = new Schema({
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true},
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true }
});


// Inherit from BaseModel schema
cartItemSchema.add(BaseModel.schema.obj);
cartItemSchema.pre('save', autoIncrementId);

const CartItem = mongoose.model<ICartItem>('CartItem', cartItemSchema);
export default CartItem;

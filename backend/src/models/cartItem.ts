import mongoose, { Schema } from 'mongoose';
import BaseModel, { IBaseModel } from './base';
import { autoIncrementId } from '../middlewares/autoIncrement';

export interface ICartItem extends IBaseModel {
    product: mongoose.Types.ObjectId; // Reference to Book model
    quantity: number;
}

const cartItemSchema: Schema<ICartItem> = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true }
});

// Apply the auto-increment ID middleware
cartItemSchema.pre('save', autoIncrementId);

// Inherit from BaseModel schema
cartItemSchema.add(BaseModel.schema.obj);

const CartItem = mongoose.model<ICartItem>('CartItem', cartItemSchema);
export default CartItem;

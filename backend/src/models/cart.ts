import mongoose, { Schema } from 'mongoose';
import BaseModel, { IBaseModel } from './base';
import { autoIncrementId } from '../middlewares/autoIncrement';

export interface ICart extends IBaseModel {
    userId: mongoose.Types.ObjectId; // Reference to User model
    items: mongoose.Types.ObjectId[]; // Array of CartItem IDs
}

const cartSchema: Schema<ICart> = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }]
});

// Inherit from BaseModel schema
cartSchema.add(BaseModel.schema.obj);
cartSchema.pre('save', autoIncrementId);

const Cart = mongoose.model<ICart>('Cart', cartSchema);
export default Cart;

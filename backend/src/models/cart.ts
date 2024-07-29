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

// Apply the auto-increment ID middleware
cartSchema.pre('save', autoIncrementId);

// Inherit from BaseModel schema
cartSchema.add(BaseModel.schema.obj);

const Cart = mongoose.model<ICart>('Cart', cartSchema);
export default Cart;

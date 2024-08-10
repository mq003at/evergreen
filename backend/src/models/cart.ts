import mongoose, { Query, Schema, Document } from 'mongoose';
import BaseModel, { IBaseModel } from './base';
import { autoIncrementId } from '../middlewares/autoIncrement';

export interface ICart extends IBaseModel {
    userId: mongoose.Types.ObjectId; // Reference to User model
    cartItems: mongoose.Types.ObjectId[]; // Array of CartItem IDs
}

const cartSchema: Schema<ICart> = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }]
});

// Inherit from BaseModel schema
cartSchema.add(BaseModel.schema.obj);
cartSchema.pre('save', autoIncrementId);

// Population
cartSchema.pre(/^find/, function (next) {
    const query = this as Query<Document<ICart>[], Document<ICart>>;
    query.populate('cartItems')
    next();
});

cartSchema.post('save', async function(doc, next) {
    await doc.populate('cartItems');
    next();
})
const Cart = mongoose.model<ICart>('Cart', cartSchema);
export default Cart;

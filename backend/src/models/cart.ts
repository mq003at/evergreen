import mongoose, { Document, Schema } from 'mongoose';

export interface ICart extends Document {
    userId: mongoose.Types.ObjectId;
}

const cartSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Cart = mongoose.model<ICart>('Cart', cartSchema);
export default Cart;
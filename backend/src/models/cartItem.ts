import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem extends Document {
    cartId: mongoose.Types.ObjectId;
    bookId: mongoose.Types.ObjectId;
}

const cartItemSchema: Schema = new Schema({
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }
});

const CartItem = mongoose.model<ICartItem>('CartItem', cartItemSchema);
export default CartItem;
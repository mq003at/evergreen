import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
    title: string;
    published: Date;
    copies: number;
    categoryId: mongoose.Types.ObjectId;
}

const bookSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    published: {
        type: Date,
        required: true
    },
    copies: {
        type: Number,
        required: true
    },
    categoryId: {type: mongoose.Types.ObjectId, ref: 'Category' }
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
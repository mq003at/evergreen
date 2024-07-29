import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthor extends Document {
    name: string;
    bio: string;
}

const authorSchema: Schema = new Schema({
    name: { type: String, required: true},
    bio: {type: String}
});

const Author = mongoose.model<IAuthor>('Author', authorSchema);

export default Author;

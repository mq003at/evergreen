import mongoose, { Schema, Document } from 'mongoose';
import BaseModel, { IBaseModel } from './base';
import { autoIncrementId } from '../middlewares/autoIncrement';

// Documentation at: https://marketplace.visualstudio.com/items?itemName=AIC.docify

/**
 * @module models/author
 * 
 * Author Model
 * 
 * This module defines the Mongoose schema and model for the `Author` collection in the MongoDB database.
 * 
 * ## Interface: IAuthor
 * 
 * The `IAuthor` interface extends `IBaseModel` and includes the following properties:
 * 
 * - `name` (string): The name of the author. This field is required.
 * - `bio` (string): A brief biography of the author. This field is required.
 * 
 * ## Schema: authorSchema
 * 
 * The `authorSchema` defines the structure of the `Author` documents in MongoDB. It includes:
 * 
 * - `name` (String): A required field that stores the author's name.
 * - `bio` (String): A required field that stores a brief biography of the author.
 * 
 * ### Middleware
 * 
 * - **`pre('save')` Middleware**: The `autoIncrementId` function is applied as a pre-save hook. This middleware automatically increments the `id` field for each new document based on the highest existing `id` in the collection. The `id` field is used as a unique identifier and starts from 1 for the first document.
 * 
 * - **Inheritance from BaseModel**: The `authorSchema` inherits properties and methods from the `BaseModel` schema by adding the `BaseModel.schema.obj` to it. This inheritance provides the `id`, `createdAt`, and `updatedAt` fields, ensuring consistency and common functionality across models.
 * 
 * ## Model: Author
 * 
 * The `Author` model is created using Mongoose’s `model` method, with the schema defined above. This model provides an interface to interact with the `Author` collection in MongoDB, supporting various CRUD operations and query methods.
 * 
 * Example Usage:
 * 
 * ```typescript
 * import Author from './models/author';
 * 
 * // Create a new author
 * const newAuthor = new Author({ name: 'J.K. Rowling', bio: 'Author of the Harry Potter series.' });
 * await newAuthor.save();
 * 
 * // Find an author by name
 * const author = await Author.findOne({ name: 'J.K. Rowling' }).exec();
 * 
 * // Update an author's biography
 * await Author.updateOne({ name: 'J.K. Rowling' }, { bio: 'Renowned British author.' }).exec();
 * 
 * // Delete an author
 * await Author.deleteOne({ name: 'J.K. Rowling' }).exec();
 * ```
 * 
 * @see [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
 * @see [BaseModel Documentation](./baseModel)
 */

export interface IAuthor extends IBaseModel {
    name: string;
    bio: string;
}

const authorSchema: Schema<IAuthor> = new Schema({
    name: { type: String, required: true },
    bio: { type: String, required: true }
});

// Inherit from BaseModel schema
authorSchema.add(BaseModel.schema.obj);
authorSchema.pre('save', autoIncrementId);

const Author = mongoose.model<IAuthor>('Author', authorSchema);
export default Author;

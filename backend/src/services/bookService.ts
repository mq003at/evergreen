import Book, { IBook } from '../models/book';

export const getAllBooks = async (): Promise<IBook[]> => {
    return await Book.find();
};

export const getBookById = async (id: string): Promise<IBook | null> => {
    return await Book.findById(id);
};

export const createBook = async (bookData: Partial<IBook>): Promise<IBook> => {
    const book = new Book(bookData);
    return await book.save();
};

export const updateBook = async (id: string, bookData: Partial<IBook>): Promise<IBook | null> => {
    return await Book.findByIdAndUpdate(id, bookData, { new: true });
};

export const deleteBook = async (id: string): Promise<IBook | null> => {
    return await Book.findByIdAndDelete(id);
};
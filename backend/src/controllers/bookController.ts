import { Request, Response } from 'express';
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../services/bookService';


export const getAllBooksHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const books = await getAllBooks();
        res.json(books);
    } catch (err) {
        const error = err as Error;
        res.status(500).send(error.message);
    }
};

export const getBookByIdHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await getBookById(req.params.id);
        if (!book) {
            res.status(404).send('Book not found');
            return;
        }
        res.json(book);
    } catch (err) {
        const error = err as Error;
        res.status(500).send(error.message);
    }
};

export const createBookHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await createBook(req.body);
        res.status(201).json(book);
    } catch (err) {
        const error = err as Error;
        res.status(400).send(error.message);
    }
};

export const updateBookHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await updateBook(req.params.id, req.body);
        if (!book) {
            res.status(404).send('Book not found');
            return;
        }
        res.json(book);
    } catch (err) {
        const error = err as Error;
        res.status(400).send(error.message);
    }
};

export const deleteBookHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await deleteBook(req.params.id);
        if (!book) {
            res.status(404).send('Book not found');
            return;
        }
        res.send('Book deleted');
    } catch (err) {
        const error = err as Error;
        res.status(500).send(error.message);
    }
};

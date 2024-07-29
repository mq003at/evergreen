import express from 'express';
import {
    getAllBooksHandler,
    getBookByIdHandler,
    createBookHandler,
    updateBookHandler,
    deleteBookHandler
} from '../controllers/bookController';

const router = express.Router();

router.get('/', getAllBooksHandler);
router.get('/:id', getBookByIdHandler);
router.post('/', createBookHandler);
router.put('/:id', updateBookHandler);
router.delete('/:id', deleteBookHandler);

export default router;
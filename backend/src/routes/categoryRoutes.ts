import express from 'express';
import {
    getAllCategoriesHandler,
    getCategoryByIdHandler,
    createCategoryHandler,
    updateCategoryHandler,
    deleteCategoryHandler
} from '../controllers/categoryController';

const router = express.Router();

router.get('/', getAllCategoriesHandler);
router.get('/:id', getCategoryByIdHandler);
router.post('/', createCategoryHandler);
router.put('/:id', updateCategoryHandler);
router.delete('/:id', deleteCategoryHandler);

export default router;
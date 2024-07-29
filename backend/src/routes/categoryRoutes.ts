import express from 'express';
import {
    getAllCategoriesHandler,
    getCategoryByIdHandler,
    createCategoryHandler,
    updateCategoryHandler,
    deleteCategoryHandler
} from '../controllers/categoryController';

const router = express.Router();

// Swagger generation on Node is dumb. Swashbuckle is much much better.

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', getAllCategoriesHandler);
router.get('/:id', getCategoryByIdHandler);
router.post('/', createCategoryHandler);
router.put('/:id', updateCategoryHandler);
router.delete('/:id', deleteCategoryHandler);

export default router;
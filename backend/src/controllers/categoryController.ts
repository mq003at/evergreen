import { Request, Response } from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../services/categoryService';
import { AxiosError } from 'axios';

export const getAllCategoriesHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await getAllCategories();
        res.json(categories);
    } catch (err) {
        const error = err as AxiosError;
        res.status(500).send(error.message);
    }
};

export const getCategoryByIdHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await getCategoryById(req.params.id);
        if (!category) {
            res.status(404).send('Category not found');
            return;
        }
        res.json(category);
    } catch (err) {
        const error = err as AxiosError;
        res.status(500).send(error.message);
    }
};

export const createCategoryHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await createCategory(req.body);
        res.status(201).json(category);
    } catch (err) {
        const error = err as AxiosError;
        res.status(400).send(error.message);
    }
};

export const updateCategoryHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await updateCategory(req.params.id, req.body);
        if (!category) {
            res.status(404).send('Category not found');
            return;
        }
        res.json(category);
    } catch (err) {
        const error = err as AxiosError;
        res.status(400).send(error.message);
    }
};

export const deleteCategoryHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await deleteCategory(req.params.id);
        if (!category) {
            res.status(404).send('Category not found');
            return;
        }
        res.send('Category deleted');
    } catch (err) {
        const error = err as AxiosError;
        res.status(500).send(error.message);
    }
}
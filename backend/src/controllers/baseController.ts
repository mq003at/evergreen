// baseController.ts

import { Request, Response, NextFunction } from 'express';
import { BaseService } from '../services/baseService';
import { Document } from 'mongoose';

export class BaseController<T extends Document> {
    protected service: BaseService<T>;

    constructor(service: BaseService<T>) {
        this.service = service;
    }

    // Create a new document
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const result = await this.service.create(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    // Find a document by ID
    async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const result = await this.service.findById(id);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'Not Found' });
            }
        } catch (error) {
            next(error);
        }
    }

    // Update a document by ID
    async updateById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const result = await this.service.update(id, updateData);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'Not Found' });
            }
        } catch (error) {
            next(error);
        }
    }

    // Delete a document by ID
    async deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const result = await this.service.delete(id);
            if (result) {
                res.status(200).json({ message: 'Deleted successfully' });
            } else {
                res.status(404).json({ message: 'Not Found' });
            }
        } catch (error) {
            next(error);
        }
    }
}

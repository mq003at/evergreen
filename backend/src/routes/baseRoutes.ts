import { Router } from "express";
import { BaseController } from "../controllers/baseController";
import { Document } from "mongoose";
import { authenticateAdmin } from "../middlewares/authentication";

export class BaseRoutes<T extends Document<unknown, any, any>> {
    public router: Router;
    protected controller: BaseController<T>;

    constructor(controller: BaseController<T>) {
        this.router = Router();
        this.controller = controller;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', authenticateAdmin ,this.controller.create);
        this.router.get('/:id', this.controller.read);
        this.router.put('/:id', authenticateAdmin, this.controller.update);
        this.router.delete('/:id', authenticateAdmin, this.controller.delete);
        this.router.get('/', this.controller.getAll);
    }
}

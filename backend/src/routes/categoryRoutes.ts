import { CategoryController } from "../controllers/categoryController";
import { ICategory } from "../models/category";
import { BaseRoutes } from "./baseRoutes";

class CategoryRoutes extends BaseRoutes<ICategory> {
    constructor() {
        super(new CategoryController())
    }
}

const categoryRoutes = new CategoryRoutes();
export default categoryRoutes.router;
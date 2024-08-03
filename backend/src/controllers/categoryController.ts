import { ICategory } from "../models/category"
import { CategoryService } from "../services/categoryService"
import { BaseController } from "./baseController"

export class CategoryController extends BaseController<ICategory>{
    constructor() {
        super(new CategoryService())
    }
}
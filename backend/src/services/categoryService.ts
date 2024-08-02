import Category, { ICategory } from "../models/category";
import { BaseService } from "./baseService";

export class CategoryService extends BaseService<ICategory> {
    constructor() {
        super(Category);
    }
}
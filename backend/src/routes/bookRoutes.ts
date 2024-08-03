import { BookController } from "../controllers/bookController";
import { IBook } from "../models/book";
import { BaseRoutes } from "./baseRoutes";

class BookRoutes extends BaseRoutes<IBook> {
    constructor() {
        super(new BookController());
    }
}

const bookRoutes = new BookRoutes();
export default bookRoutes.router;
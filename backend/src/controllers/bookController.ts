import { IBook } from "../models/book"
import { BookService } from "../services/bookService";
import { BaseController } from "./baseController";

export class BookController extends BaseController<IBook> {
    constructor() {
        super(new BookService());
    }
}
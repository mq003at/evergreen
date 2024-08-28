import { UserNoPassword } from "./DTOs/User";
import { Author, Book, Cart, Category, Loan, TokenPayload, User } from "./models";

export interface BaseState<T> {
    dataArray: T[];
    error: string | null;
}

export interface AuthorState extends BaseState<Author>{}
export interface BookState extends BaseState<Book>{}
export interface LoanState extends BaseState<Loan>{}
export interface CartState extends BaseState<Cart>{}
export interface CategoryState extends BaseState<Category>{}

export interface UserState {
    user: UserNoPassword;
    token: TokenPayload;
    error: null;
}
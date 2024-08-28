import { Author, Base, Book, Cart, Category, Role } from "../models";

export interface UserNoPassword extends Base {
    name: string;
    email: string;
    password: string;
    role: Role;
    cart: Cart;
}

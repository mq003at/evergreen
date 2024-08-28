export interface Base {
    _id: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

export type Role = "Admin" | "User"

export type Purpose = "rememberMe" | "temporary"

export interface TokenPayload {
    tokenString: string;
    purpose: Purpose;
}

export interface Author extends Base {
    name: string;
    bio: string;
}

export interface Category extends Base {
    name: string;
    description: string;
}

export interface Book extends Base {
    title: string;
    author: Author;
    category: Category;
    publishedDate: string;
    price: number;
}

export interface User extends Base {
    name: string;
    email: string;
    password: string;
    role: Role;
    cart: Cart;
}

export interface Loan extends Base {
    book: Book;
    userId: User;
    loanDate: string;
    returnDate: string;
}

export interface CartItem extends Base {
    cartId: string;
    book: Book;
    quantity: number
}

export interface Cart extends Base {
    userId: string;
    cartItem: CartItem
}

// DTO sections
export interface AddedBook {
    title: string;
    author: string;
    category:  string;
    publishedDate: Date;
    price: number
}

export interface AddedCategory {
    name: string;
    description: string
}

export interface AddedAuthor {
    name: string;
    bio: string
}
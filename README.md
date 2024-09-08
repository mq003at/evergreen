
# Project Evergreen

Evergreen is a library project written in JavaScript. It is a platform ultilizing library API to get data from ExpressJS backend server and display the book information in the ReactJS frontpage.

# Installation

Since both project are written with JavaScript and NodeJS, after you pull the project from my Github, you can run these two commands in folder `frontend` and `backend`. The commands will install all the required dependancies and starts the project. 

	npm install
    npm run start

# Project Structure
## 1. Frontend
<details>
<summary>Open Project Structure (Frontend)</summary>

```bash
.
└── frontend/
    ├── public
    ├── node_modules
    ├── src/
    │   ├── assets/
    │   │   ├── fonts
    │   │   └── img
    │   ├── components/
    │   │   ├── Frontpage  /
    │   │   │   └── FrontPage.tsx
    │   │   ├── Header  /
    │   │   │   └── Header.tsx
    │   │   └── Others/
    │   │       ├── BreadcrumbButtons.tsx
    │   │       └── Breadcrumbs.tsx
    │   ├── redux/
    │   │   ├── reducers/
    │   │   │   ├── AuthorReducer.tsx
    │   │   │   ├── BoookReducer.tsx
    │   │   │   ├── BaseReducer.tsx
    │   │   │   ├── CartReducer.tsx
    │   │   │   ├── CategoryReducer.tsx
    │   │   │   ├── LoanReducer.tsx
    │   │   │   └── UserReducer.tsx
    │   │   ├── reduxHooks.tsx
    │   │   ├── sharedInstance.tsx
    │   │   └── store.tsx
    │   ├── test
    │   ├── styles/
    │   │   └── css/
    │   │       └── index.css
    │   ├── types/
    │   │   ├── Models.tsx
    │   │   └── reducers.tsx
    │   └── App.tsx
    ├── package.json
    ├── README.md
    └── tsconfig.json
```
</details>


## 2. Backend

<details>
<summary>Open Project Structure (Backend)</summary>

```bash
  .
└── backend/
    ├── dist
    ├── node_modules
    ├── src/
    │   ├── configs/
    │   │   ├── db.ts
    │   │   ├── passport.ts
    │   │   └── swaggerConfig.ts
    │   ├── controllers/
    │   │   ├── authorController.ts
    │   │   ├── baseController.ts
    │   │   ├── bookController.ts
    │   │   ├── cartController.ts
    │   │   ├── categoryController.ts
    │   │   ├── cartItemController.ts
    │   │   ├── loanController.ts
    │   │   └── userController.ts
    │   ├── middlewares/
    │   │   ├── modelMiddlewares/
    │   │   │   ├── cart.middlewares.ts
    │   │   │   └── user.middlewares.ts
    │   │   ├── authentication.ts
    │   │   ├── autoIncrement.ts
    │   │   ├── loggerMiddleware.ts
    │   │   └── timeStamp.ts
    │   ├── models/
    │   │   ├── DTO/
    │   │   │   ├── baseDTO.ts
    │   │   │   └── userDTO.ts
    │   │   ├── author.ts
    │   │   ├── base.ts
    │   │   ├── book.ts
    │   │   ├── cart.ts
    │   │   ├── category.ts
    │   │   ├── cartItem.ts
    │   │   ├── loanr.ts
    │   │   └── user.ts
    │   ├── routes/
    │   │   ├── authorRoutes.ts
    │   │   ├── baseRoutes.ts
    │   │   ├── bookRoutes.ts
    │   │   ├── cartRoutes.ts
    │   │   ├── categoryRoutes.ts
    │   │   ├── cartItemRoutes.ts
    │   │   ├── loanRoutes.ts
    │   │   └── userRoutes.ts
    │   ├── services/
    │   │   ├── authorService.ts
    │   │   ├── baseService.ts
    │   │   ├── bookService.ts
    │   │   ├── cartService.ts
    │   │   ├── categoryService.ts
    │   │   ├── cartItemService.ts
    │   │   ├── loanService.ts
    │   │   └── userService.ts
    │   ├── test
    │   ├── utils/
    │   │   ├── jwt.ts
    │   │   └── type.ts
    │   └── app.ts
    ├── .env
    ├── package.json
    └── tsconfig.json
```
</details>

# Functionalities
## 1. Frontend

## 2. Backend

# Development

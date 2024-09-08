import express from 'express';
import session from 'express-session';
import connectDB from './configs/db';
import loggerMiddleware from './middlewares/loggerMiddleware';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import categoryRoutes from './routes/categoryRoutes';
import cartRoutes from './routes/cartRoutes';
import passport from './configs/passport';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './configs/swaggerConfig';
import dotenv from 'dotenv';
import authorRoutes from './routes/authorRoutes';
import mongoose from 'mongoose';
import loanRoutes from './routes/loanRoutes';
import cartItemRoutes from './routes/cartItemRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();
mongoose.set('debug', true);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(
    session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false
    })
);

// app.use(passport.initialize());
// app.use(passport.session());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Redirect root to Swagger UI
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/users', userRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/cartItem', cartItemRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Library Management System');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

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

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(loggerMiddleware);
app.use(
    session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Redirect root to Swagger UI
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/carts', cartRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Library Management System');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

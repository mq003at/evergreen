import express from 'express';
import {
    getAllUsersHandler,
    getUserByIdHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
    loginHandler,
    logoutHandler,
    getCurrentUserHandler
} from '../controllers/userController';

const router = express.Router();

router.get('/', getAllUsersHandler);
router.get('/:id', getUserByIdHandler);
router.post('/', createUserHandler);
router.put('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);

router.post('/login', loginHandler);
router.post('/logout', logoutHandler);
router.get('/me', getCurrentUserHandler);

export default router;

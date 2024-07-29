import { Request, Response } from 'express';
import passport from 'passport';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../services/userService';
import { AxiosError } from 'axios';
import { IUser } from '../models/user';

export const getAllUsersHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        const error = err as AxiosError;
        res.status(500).send(error.message);
    }
};

export const getUserByIdHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.json(user);
    } catch (err) {
        const error = err as AxiosError;
        res.status(500).send(error.message);
    }
};

export const createUserHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        const error = err as AxiosError;
        res.status(400).send(error.message);
    }
};

export const updateUserHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await updateUser(req.params.id, req.body);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.json(user);
    } catch (err) {
        const error = err as AxiosError;
        res.status(400).send(error.message);
    }
};

export const deleteUserHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await deleteUser(req.params.id);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.send('User deleted');
    } catch (err) {
        const error = err as AxiosError;
        res.status(500).send(error.message);
    }
};

export const loginHandler = (req: Request, res: Response, next: Function) => {
    passport.authenticate('local', (err: Error, user: IUser, info: { message: string }) => {
        if (err) return next(err);
        if (!user) return res.status(401).send(info.message);
        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json(user);
        });
    })(req, res, next);
};

export const logoutHandler = (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) {
            const error = err as AxiosError;
            return res.status(500).send(error.message);
        }
        res.send('Logged out');
    });
};

export const getCurrentUserHandler = (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        return res.json(req.user);
    }
    res.status(401).send('Not authenticated');
};

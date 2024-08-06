import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";
import { IUser } from "../models/user";
import { UserEmailRequest, UserRequest, UserUpdateRequest } from "../models/DTO/userDTO";

const userService = new UserService()

export class UserController {
    public async register(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        const { email, password, purpose } = req.body;
        try {
            const user = await userService.register(email, password, purpose);
            if (!user) {
                res.json(500).json({ message: `There is a problem registrering new user. Please try it again.` } )
            }
            else {
                res.status(201).json(user);
            }
        } catch (error) {
            next(error)
        }
    }

    public login = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
        const { email, password } = req.body;
        try {
            const user = await userService.login(email, password);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    public isRegistered = async (req: UserEmailRequest, res: Response, next: NextFunction): Promise<void> => {
        const { email } = req.body;
        try {
            const isRegistered = await userService.isRegistered(email);
            if (isRegistered) res.status(200).json({ isRegistered: true});
            else res.status(200).json({ isRegistered: false });
        } catch (error) {
            next(error);
        }
    }

    public update = async (req: UserUpdateRequest, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;
        try {
            const updatedUser = await userService.update(id, req.body);
            res.status(200).json(updatedUser);
        } catch (error) {
            next (error);
        }
    }

    public delete = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;
        try {
            const deletedUser = await userService.delete(id);
            if (deletedUser) res.status(200).json({ isDeleted: true });
            else res.status(200).json({ isDeleted: false });
        } catch (error) {
            next(error)
        }
    }
}
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";
import { IUser } from "../models/user";
import { UserEmailRequest, UserNoPasswordResponse, UserRequest, UserUpdateRequest } from "../models/DTO/userDTO";

const userService = new UserService()

export class UserController {
    public async register(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        const { email, password, purpose } = req.body;
        try {
            const registeredUser = await userService.register(email, password, purpose, 'User');
            console.log("reached", registeredUser)
            if (registeredUser instanceof UserNoPasswordResponse) {
                res.status(201).json(registeredUser);
            }
            else {
                res.json(403).json()
            }
        } catch (error) {
            next(error)
            res.json(403).json({ message: `There is a problem registrering new user. Please try it again.` } )
        }
    }

    public async adminRegister(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        const { email, password, purpose } = req.body;
        try {
            const registeredUser = await userService.register(email, password, purpose, 'Admin');
            if (!registeredUser) {
                res.json(403).json({ message: `There is a problem registrering new user. Please try it again.` } )
            }
            else {
                res.status(201).json(registeredUser);
            }
        } catch (error) {
            next(error)
            res.json(403).json({ message: `There is a problem registrering new user. Please try it again.` } )
        }
    }

    public login = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
        const { email, password, purpose } = req.body;
        try {
            const loginedUser = await userService.login(email, password, purpose);

            if (typeof loginedUser === "string") res.status(403).json(loginedUser);
            else res.status(200).json(loginedUser);
        } catch (error) {
            next(error);
            res.json(403).json({ message: `There is a problem logging in user. Please try it again.` } )
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
            res.json(403).json({ message: `There is a problem checking user registration status. Please try it again.` } )
        }
    }

    public update = async (req: UserUpdateRequest, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;
        try {
            const updatedUser = await userService.update(id, req.body);
            res.status(200).json(updatedUser);
        } catch (error) {
            next (error);
            res.json(403).json({ message: `There is a problem updating user. Please try it again.` } )
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
            res.json(403).json({ message: `There is a problem deleting user. Please try it again.` } )
        }
    }
}
import { Request, Response, NextFunction } from "express";
import { TokenPayload } from "../utils/jwt";
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'placeholder_jwt_secret';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const payload = jwt.verify(token, secret) as TokenPayload;
        req.tokenPayload = payload;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
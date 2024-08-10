import { Request, Response, NextFunction } from "express";
import { TokenPayload, VerifyPayload } from "../utils/jwt";
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            tokenPayload?: TokenPayload
        }
    }
}

const secret = process.env.JWT_SECRET || 'placeholder_jwt_secret';

export const authenticateTokenUserOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const paramId = req.params.id;

    console.log('token', token)

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const verify = jwt.verify(token, secret) as unknown as VerifyPayload;
        const decoded = verify.tokenPayload;
        
        req.tokenPayload = decoded;

        const role = decoded.role;
        const userId = decoded.sub;
        console.log('token', userId, role, decoded);

        if (role === 'Admin' || userId.toString() === paramId) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const verify = jwt.verify(token, secret) as unknown as VerifyPayload;
        const decoded = verify.tokenPayload;
        req.tokenPayload = decoded;

        const role = decoded.role;
        console.log('role', role)

        if (role === 'Admin' ) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

export const authenticateAlwaysForbidden = (req: Request, res: Response, next: NextFunction) => {
    res.status(403).json({ message: 'Unauthorized for every roles.' })
}
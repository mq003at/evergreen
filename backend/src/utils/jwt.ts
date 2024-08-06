// utils/jwt.ts

import jwt from 'jsonwebtoken';
import { Role } from '../models/user';

const secret = process.env.JWT_SECRET || 'placeholder_jwt_secret';
const dayExpiration = process.env.JWT_DAY || '12h';
const monthExpiration = process.env.JWT_MONTH || '720h'
const iss = process.env.JWT_ISS || 'Evergreen Oy'

export type Purpose = 'temporary' | 'rememberMe';
export interface TokenPayload {
    sub: string;
    role: string;
    iat: number;
    exp: number;
    iss: string;
    purpose: Purpose;
}

export const generateToken = (userId: string, role: Role, purpose: Purpose): string => {
    const expiresIn = (purpose === 'temporary') ? dayExpiration : monthExpiration;
    const iat = Math.floor(Date.now() / 1000);
    const exp = Math.floor(Date.now() / 1000) + (purpose === 'temporary' ? 86400 : 2592000);

    const tokenPayload: TokenPayload = {
        sub: userId,
        role: role,
        iat,
        exp,
        iss,
        purpose
    }

    return jwt.sign({ tokenPayload }, secret, { expiresIn });
};



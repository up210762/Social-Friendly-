// src/middleware/authToken.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../keys';

export function authToken(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Invalid Token Prefix' });
        }

        const token = authHeader.split(' ')[1];

        // Valida que existe el token
        if (!token) {
            return res.status(401).json({ message: 'Authentication Error' });
        }

        // Verifica el token
        const user = jwt.verify(token, JWT_SECRET) as User;

        // Guarda el usuario en la petición http
        req.user = { ...user };

        return next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: 'Invalid Token!' });
        }
        return res.status(400).json({ message: 'Error in the files' });
    }
}

export interface User extends JwtPayload {
    id: string | number;
}

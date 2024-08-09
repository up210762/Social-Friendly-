// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { getUserService, getUsersService, deleteUserService, updateUserService } from '../services/users';
import { encryptPass } from '../services/hash';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../keys';
import { readSync } from 'fs';

export async function getOneUser(req: Request, res: Response) {
    const authHeader = req.headers['authorization'];

    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    try {
        const decoded: any = verify(token, JWT_SECRET);
        const userId = decoded.id;
        const [user]: any = await getUserService(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(user);
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export async function getManyUsers(req: Request, res: Response) {
    const authHeader = req.headers['authorization'];

    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    try {
        const decoded: any = verify(token, JWT_SECRET);
        const id: number = decoded.id;
        const users = await getUsersService(id);

        // Verifica que 'users' es un array
        if (!Array.isArray(users)) {
            return res.status(500).json({ message: "Server error: users should be an array" });
        }

        res.json(users);
        return;
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
}

export async function updateUser(req: Request, res: Response) {
    const authHeader = req.headers['authorization'];

    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    try {
        const decoded: any = verify(token, JWT_SECRET);
        const userId = decoded.id;

        if (req.body.password) {
            req.body.password = await encryptPass(req.body.password);
        }

        const resp = await updateUserService(userId, req.body);

        if (typeof resp === 'boolean') {
            if (resp === true) {
                res.json({ message: "Usuario actualizado" });
                return;
            } else {
                res.status(404).json({ message: "El usuario no existe." });
                return;
            }
        } else {
            res.status(500).json({ message: resp });
            return;
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
}

export async function deleteUser(req: Request, res: Response) {
    const authHeader = req.headers['authorization'];

    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    try {
        const decoded: any = verify(token, JWT_SECRET);
        const userId = decoded.id;
        const resp = await deleteUserService(userId);
        return res.status(200).json({ message: resp });
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

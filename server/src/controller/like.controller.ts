// like.controller.ts

import { Request, Response } from 'express';
import { createLikeService, getLikesService, checkLikeExistsService } from '../services/likes'; // Importa el nuevo servicio

export async function createLike(req: Request, res: Response) {
    const userId = Number(req.user.id);  
    const likedUserId = Number(req.body.likedUserId);

    if (isNaN(likedUserId)) {
        return res.status(400).json({ message: "User to like is required and must be a number" });
    }

    // Verifica si el like ya existe antes de crearlo
    const likeExists = await checkLikeExistsService(userId, likedUserId);

    if (likeExists) {
        return res.status(400).json({ message: "You have already liked this user" });
    }

    const resp = await createLikeService(userId, likedUserId);

    if (resp) {
        return res.status(201).json({ message: "Like added successfully" });
    } else {
        return res.status(500).json({ message: "Error adding like" });
    }
}

export async function getLikes(req: Request, res: Response) {
    const userId = Number(req.user.id);  

    const likes = await getLikesService(userId);

    if (likes.length > 0) {
        return res.status(200).json(likes);
    } else {
        return res.status(404).json({ message: "No likes found" });
    }
}

export async function checkLikeExists(req: Request, res: Response) {
    const userId = Number(req.query.userId);
    const likedUserId = Number(req.query.likedUserId);

    if (isNaN(userId) || isNaN(likedUserId)) {
        return res.status(400).json({ message: "Both userId and likedUserId are required and must be numbers" });
    }

    const exists = await checkLikeExistsService(userId, likedUserId);

    if (exists) {
        return res.status(200).json({ exists: true });
    } else {
        return res.status(200).json({ exists: false });
    }
}

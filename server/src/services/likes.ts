// likes.service.ts

import conn from '../db';
import { MAIN_DB_PREFIX } from '../keys';

// Función para crear un like
export const createLikeService = async (userId: number, likedUserId: number) => {
    const SQL = `INSERT INTO ${MAIN_DB_PREFIX}tc_likes (Id_UsuarioDioLike, Id_UsuarioRecibioLike, Fecha_Like) VALUES (?, ?, NOW());`;

    try {
        await conn.execute(SQL, [userId, likedUserId]);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Función para obtener los likes de un usuario
export const getLikesService = async (userId: number): Promise<any[]> => {
    const SQL = `SELECT
        tu.id,
        tu.full_name,
        tu.username,
        tp.url_photo as urlPhoto,
        l.Fecha_Like
    FROM ${MAIN_DB_PREFIX}tc_likes l
    LEFT JOIN ${MAIN_DB_PREFIX}tr_user tu ON l.Id_UsuarioRecibioLike = tu.id
    LEFT JOIN ${MAIN_DB_PREFIX}tr_profile tp ON tu.id = tp.id_user
    WHERE l.Id_UsuarioDioLike = ?;`;

    try {
        const [likes]: any[] = await conn.query(SQL, [userId]);
        return likes;
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Función para verificar si un like ya existe
export const checkLikeExistsService = async (userId: number, likedUserId: number): Promise<boolean> => {
    const SQL = `SELECT COUNT(*) AS count
    FROM ${MAIN_DB_PREFIX}tc_likes
    WHERE Id_UsuarioDioLike = ? AND Id_UsuarioRecibioLike = ?;`;

    try {
        const [result]: any[] = await conn.query(SQL, [userId, likedUserId]);
        const count = result[0]?.count || 0;
        return count > 0;
    } catch (error) {
        console.log(error);
        return false;
    }
};

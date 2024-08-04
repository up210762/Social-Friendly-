import { array } from 'zod';
import conn from '../db';
import { MAIN_DB_PREFIX } from '../keys';

export const getUserService = async (userId: string | number) => {
    //Crear la sentencia 
    const SQL = `select
    tu.id,
    tu.full_name,
    tu.username,
    tp.bio AS description,
    tu.email,
    tu.date_of_birthday
    FROM ${MAIN_DB_PREFIX}tr_user tu 
    LEFT JOIN ${MAIN_DB_PREFIX}tr_profile tp
    ON tu.id = tp.id_user
    WHERE tu.id = ${userId};`;

    const [res] = await conn.query(SQL, [userId]);
    return res;
}

export const getUsersService = async (idUser: number) => {
    const query = `SELECT 
    tu.id,
    tu.full_name,
    tu.username,
    tp.bio AS description,
    tu.email,
    (SELECT "/public/sin-fotos.png") AS urlPhoto,
    tu.date_of_birthday
    FROM ${MAIN_DB_PREFIX}tr_user tu 
    LEFT JOIN ${MAIN_DB_PREFIX}tr_profile tp
    ON tu.id = tp.id_user
    WHERE
    tu.is_active=1 AND tu.id <> ${idUser};`;

    const users = await conn.query(query);

    return users;
};

export const updateUserService = async (userId: number | string, user: UpdateUser) => {
    // Generar la consulta SQL 1para actualizar la tarea
    const completeUpdateSQL = `UPDATE ${MAIN_DB_PREFIX}tr_user SET full_name=?, username=?, password=?, date_of_birthday=?
    WHERE id=?;`;

    const partialUpdateSQL = `UPDATE ${MAIN_DB_PREFIX}tr_user SET full_name=?, username=?, date_of_birthday=?
    WHERE id=?;`;

    const searchProfile = `SELECT COUNT(*) AS count FROM ${MAIN_DB_PREFIX}tr_profile
    WHERE id_user=?;`;

    const createProfile = `INSERT INTO ${MAIN_DB_PREFIX}tr_profile
    (id_user, id_gender, bio, location) VALUES 
    (?,?,?,?);`;

    const updateProfile = `UPDATE ${MAIN_DB_PREFIX}tr_profile
    SET id_gender=?, bio=?, location=? WHERE id_user=?;`;

    try {
        if (user.password)
            await conn.execute(completeUpdateSQL, [user.full_name, user.username, user.password, user.date_of_birthday, userId]);
        
        await conn.execute(partialUpdateSQL, [user.full_name, user.username, user.date_of_birthday, userId]);

        const [resSearchProfile]: any = await conn.execute(searchProfile, [userId]);

        if (resSearchProfile[0].count === 0) {
            const resCreateProfile = await conn.execute(createProfile, [userId, null, user.description, null])
        } else {
            const resUpdateProfile = await conn.execute(updateProfile, [null, user.description, null, userId]);
        }
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}

export const deleteUserService = async (userId: number | string) => {
    try {
        const checkExistenceSQL = `SELECT COUNT(*) AS count FROM ${MAIN_DB_PREFIX}tr_user WHERE id=?`;

        const [rows]: any = await conn.execute(checkExistenceSQL, [userId]);

        const count = rows[0].count;

        if (count === 0) {
            return "El usuario no existe.";
        }

        const deletSQL = `DELETE FROM ${MAIN_DB_PREFIX}tr_user WHERE id=?;`;

        await conn.execute(deletSQL, [userId]);

        return "Usuario eliminada."
    } catch (error) {
        return error;
    }
}

export interface CreateUser {
    full_name: string;
    username: string;
    password: string;
    email: string;
    date_of_birthday: Date;
}

export interface UpdateUser {
    full_name: string | null;
    username: string | null;
    description?: string | null;
    gender?: number | null;
    location?: string | null;
    password?: string | null;
    date_of_birthday: Date | null;
}
import conn from '../db';
import { MAIN_DB_PREFIX, PATH_DEFAULT_IMAGE } from '../keys';

export const getInterestsService = async (userId: string | number) => {
    //Crear la sentencia 
    const SQL = `select
    tu.id,
    tu.full_name,
    tu.username,
    tp.bio AS description,
    tu.email,
    tu.date_of_birthday,
    tp.url_photo as urlPhoto
    FROM ${MAIN_DB_PREFIX}tr_user tu 
    LEFT JOIN ${MAIN_DB_PREFIX}tr_profile tp
    ON tu.id = tp.id_user
    WHERE tu.id = ${userId};`;

    const [res] = await conn.query(SQL, [userId]);
    return res;
}

export const updateUserService = async (userId: number | string, user: UpdateUser) => {
    // Generar la consulta SQL 1para actualizar la tarea
    const completeUpdateSQL = `UPDATE ${MAIN_DB_PREFIX}tr_user SET full_name=?, username=?, password=?, date_of_birthday=?
    WHERE id=?;`;

    const partialUpdateSQL = `UPDATE ${MAIN_DB_PREFIX}tr_user SET full_name=?, username=?, date_of_birthday=?
    WHERE id=?;`;

    const searchProfile = `SELECT COUNT(*) AS count FROM ${MAIN_DB_PREFIX}tr_profile
    WHERE id_user=?;`;

    const updateProfile = `UPDATE ${MAIN_DB_PREFIX}tr_profile
    SET id_gender=?, bio=?, location=? WHERE id_user=?;`;

    try {
        if (user.password)
            await conn.execute(completeUpdateSQL, [user.full_name, user.username, user.password, user.date_of_birthday, userId]);
        
        await conn.execute(partialUpdateSQL, [user.full_name, user.username, user.date_of_birthday, userId]);

        const [resSearchProfile]: any = await conn.execute(searchProfile, [userId]);

        await conn.execute(updateProfile, [null, user.description, null, userId]);
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
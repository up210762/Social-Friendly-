import conn from '../db';
import { MAIN_DB_PREFIX } from '../keys';

export const getUserService = async (userId: string | number) => {
    //Crear la sentencia 
    const SQL = `select
    TU.id,
    TU.full_name,
    TU.username,
    TU.email,
    TU.date_of_birthday
    from ${MAIN_DB_PREFIX}TR_USER TU
    where TU.id=?;`

    const [res] = await conn.query(SQL, [userId]);
    return res;
}

export const getUsersService = async () => {
    const query = `SELECT 
    TU.id,
    TU.full_name,
    TU.username,
    TU.email,
    TU.date_of_birthday
    FROM ${MAIN_DB_PREFIX}TR_USER TU;`

    const [users] = await conn.query(query)

    return users;
};

export const updateUserService = async (userId: number | string, user: UpdateUser) => {
    // Generar la consulta SQL 1para actualizar la tarea
    const completeUpdateSQL = `UPDATE ${MAIN_DB_PREFIX}TR_USER SET name=?, username=?, password=?, birthday=?
    VALUES (?,?,?) WHERE id=?;`;

    const partialUpdateSQL = `UPDATE ${MAIN_DB_PREFIX}TR_USER SET name=?, username=?, birthday=?
    WHERE id=?;`;

    try {
        if (!user.password)
            await conn.execute(partialUpdateSQL, [user.name, user.username, user.birthday, userId]);
        await conn.execute(completeUpdateSQL, [user.name, user.username, user.password, user.birthday, userId]);

        return true;

    } catch (error) {
        return error
    }
}

export const deleteUserService = async (userId: number | string) => {
    try {
        const checkExistenceSQL = `SELECT COUNT(*) AS count FROM ${MAIN_DB_PREFIX}TR_USER WHERE id=?`;

        const [rows]: any = await conn.execute(checkExistenceSQL, [userId]);

        const count = rows[0].count;

        if (count === 0) {
            return "La tarea o usuario no existe.";
        }

        const deletSQL = `DELETE FROM ${MAIN_DB_PREFIX}TR_USER WHERE id=?;`;

        await conn.execute(deletSQL, [userId]);

        return "Usuario eliminada."
    } catch (error) {
        return error;
    }
}

export interface CreateUser {
    name: string;
    username: string;
    password: string;
    email: string;
    birthday: Date;
}

export interface UpdateUser {
    name: string | null;
    username: string | null;
    password?: string | null;
    birthday: Date | null;
}
import conn from '../db';
import { MAIN_DB_PREFIX, PATH_DEFAULT_IMAGE } from '../keys';

export const getUsersInterestsService = async (userId: string | number) => {
    //Crear la sentencia 
    const SQL = `SELECT
    tui.user_id, tui.interest_id
    FROM ${MAIN_DB_PREFIX}tr_user_interest tui 
    LEFT JOIN ${MAIN_DB_PREFIX}tr_user tu
    ON tu.id = tp.id_user
    LEFT JOIN ${MAIN_DB_PREFIX}tr_profile tp
    ON tu.id = tui.user_id
    WHERE tu.id <> ${userId}; AND tui.user_id <> ${userId}`;

    const [res] = await conn.query(SQL, [userId]);
    return res;
}

export const getTypeInterestsService = async () => {
    //Crear la sentencia 
    const SQL = `SELECT name 
    FROM ${MAIN_DB_PREFIX}tc_type_interest`;

    const [res] = await conn.query(SQL);
    return res;
}

export const getInterestsService = async (interestId: number) => {
    //Crear la sentencia 
    const SQL = `SELECT
    tin.interest_name
    FROM ${MAIN_DB_PREFIX}tc_interest_name tin 
    LEFT JOIN ${MAIN_DB_PREFIX}tc_type_interest tti
    ON tin.interest_type = tti.id
    WHERE tin.id_interest_type = ${interestId}`;

    const [res] = await conn.query(SQL, [interestId]);
    return res;
}

export const updateInterestsService = async (userId: number | string) => {
    // Generar la consulta SQL 1para actualizar la tarea
    const completeUpdateSQL = `UPDATE ${MAIN_DB_PREFIX}tr_user SET full_name=?, username=?, password=?, date_of_birthday=?
    WHERE id=?;`;

    const partialUpdateSQL = `UPDATE ${MAIN_DB_PREFIX}tr_user SET full_name=?, username=?, date_of_birthday=?
    WHERE id=?;`;

    const searchProfile = `SELECT COUNT(*) AS count FROM ${MAIN_DB_PREFIX}tr_profile
    WHERE id_user=?;`;

    const updateProfile = `UPDATE ${MAIN_DB_PREFIX}tr_profile
    SET id_gender=?, bio=?, location=? WHERE id_user=?;`;
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
import conn from '../db';
import { MAIN_DB_PREFIX, PATH_DEFAULT_IMAGE } from '../keys';

export const getUsersInterestsService = async (userId: number) => {
    //Crear la sentencia 
    const SQL = `SELECT
    tui.user_id, tui.interest_id
    FROM ${MAIN_DB_PREFIX}tr_user_interest tui 
    LEFT JOIN ${MAIN_DB_PREFIX}tr_user tu
    ON tui.user_id = tu.id
    LEFT JOIN ${MAIN_DB_PREFIX}tr_profile tp
    ON tu.id = tp.id_user
    WHERE tu.id <> ?;`;

    const res = await conn.query(SQL, [userId]);
    return res[0];
}

export const getTypeInterestsService = async () => {
    //Crear la sentencia 
    const SQL = `SELECT name 
    FROM ${MAIN_DB_PREFIX}tc_type_interest`;

    const [res] = await conn.query(SQL);
    return res;
}

export const getInterestsService = async (interestId: any) => {
    //Crear la sentencia 
    const SQL = `SELECT
    tin.interest_name
    FROM ${MAIN_DB_PREFIX}tc_interest_name tin 
    LEFT JOIN ${MAIN_DB_PREFIX}tc_type_interest tti
    ON tin.id_interest_type = tti.id
    WHERE tin.id_interest_type=?`;

    const [res] = await conn.query(SQL, [interestId]);
    return res;
}

export const selectInterestsService = async (userId: number, interestId: number) => {
    //Crear la sentencia 
    const SQL = `INSERT INTO 
    ${MAIN_DB_PREFIX}tr_user_interest tui 
    (user_id, interest_id) VALUES
    (?,?)
    `;
    const [res] = await conn.query(SQL, [interestId]);
    return res;
}
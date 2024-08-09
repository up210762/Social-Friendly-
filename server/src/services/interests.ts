import conn from '../db';
import { MAIN_DB_PREFIX, PATH_DEFAULT_IMAGE } from '../keys';

export const getUsersInterestsService = async (userId: number, interestId: number) => {
    //Crear la sentencia 
    const SQL = `SELECT 
    tui.user_id,
    GROUP_CONCAT(tui.interest_id) AS interests
    FROM sf_tr_user_interest tui
    LEFT JOIN sf_tr_profile tp ON tp.id_user = tui.user_id
    LEFT JOIN sf_tr_user tu ON tu.id = tui.user_id
    WHERE 
    tu.id <> ${userId}
    GROUP BY 
    tui.user_id;`;

    const res = await conn.query(SQL, [userId]);
    return res;
}

//Ya quedó funcional
export const getTypeInterestsService = async () => {
    //Crear la sentencia 
    const SQL = `SELECT name 
    FROM ${MAIN_DB_PREFIX}tc_type_interest`;
    const res = await conn.query(SQL);
    return res;
}
//Ya quedó funcional
export const getInterestsByTypeService = async (interestId: any) => {
    //Crear la sentencia 
    const SQL = `SELECT
	tin.id,
	tin.interest_name
    FROM ${MAIN_DB_PREFIX}tc_interest_name tin 
    LEFT JOIN ${MAIN_DB_PREFIX}tc_type_interest tti
    ON tin.id_interest_type = tti.id
    WHERE tin.id_interest_type = ${interestId};`;
    /*
    SELECT
    tin.interest_name
    FROM ${MAIN_DB_PREFIX}tc_interest_name tin 
    LEFT JOIN ${MAIN_DB_PREFIX}tc_type_interest tti
    ON tin.interest_type = tti.id
    WHERE tin.id_interest_type = ${interestId}
    */

    //console.log("Si está entrando");
    const res = await conn.query(SQL, [interestId]);
    //console.log(res);
    return res;
}

export const selectInterestsService = async (userId: number, interestId: number) => {
    //Crear la sentencia 
    const SQL = `INSERT INTO 
    ${MAIN_DB_PREFIX}tr_user_interest tui 
    (user_id, interest_id) VALUES
    (${userId}, ${interestId})
    `;
    const [res] = await conn.query(SQL, [interestId]);
    return res;
}
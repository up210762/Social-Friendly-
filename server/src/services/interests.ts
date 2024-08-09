import conn from '../db';
import { MAIN_DB_PREFIX } from '../keys';

export const getUsersInterestsService = async (userId: number) => {
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
export const getUsersInCommonService = async (user_id:number, ids: any) => {
    const SQL = `SELECT 
    tu.id,
    tu.full_name,
    tu.username,
    tp.bio AS description,
    tu.email,
    tp.url_photo as urlPhoto,
    tu.date_of_birthday
    FROM sf_tr_user tu 
    LEFT JOIN sf_tr_profile tp
    ON tu.id = tp.id_user
    WHERE
    tu.is_active=1 AND tu.id <> ${user_id} AND tu.id IN (${ids})
    ORDER BY 
    FIELD(tu.id,${ids});`;

    /*
    

    SELECT * FROM db_social_friendly.sf_tr_user
    WHERE 
    sf_tr_user.id IN (${ids});
    */
    const res = await conn.query(SQL, [ids]);
    // console.log(res)
    return res;
}

//Ya quedó funcional
export const getTypeInterestsService = async () => {
    //Crear la sentencia 
    const SQL = `SELECT id, name 
    FROM ${MAIN_DB_PREFIX}tc_type_interest`;
    const res = await conn.query(SQL);
    return res;
}
//Ya quedó funcional
export const getInterestsByTypeService = async () => {
    const [interests]:Array<any> = await getTypeInterestsService();
    const arrayInterest:any = []
    for (let interest of interests) {
        console.log(interest)
    }
    await interests.map(async (interest:any) => {
        const SQL = `SELECT
	    tin.interest_name
        FROM ${MAIN_DB_PREFIX}tc_interest_name tin 
        LEFT JOIN ${MAIN_DB_PREFIX}tc_type_interest tti
        ON tin.id_interest_type = tti.id
        WHERE tin.id_interest_type = ?;`;
        const [res] = await conn.query(SQL, [interest.id]);
        arrayInterest.push({[`${interest.id}`]:res})
    })
    //Crear la sentencia 
    /*
    SELECT
    tin.interest_name
    FROM ${MAIN_DB_PREFIX}tc_interest_name tin 
    LEFT JOIN ${MAIN_DB_PREFIX}tc_type_interest tti
    ON tin.interest_type = tti.id
    WHERE tin.id_interest_type = ${interestId}
    */

    //console.log("Si está entrando");
    //console.log(res);
    return await arrayInterest;
}

export const selectInterestsService = async (userId: number, interestId: number) => {
    //Crear la sentencia 
    const SQL = `INSERT INTO 
    ${MAIN_DB_PREFIX}tr_user_interest
    (user_id, interest_id) VALUES
    (?,?)
    `;
    const [res] = await conn.query(SQL, [userId,interestId]);
    return res;
}
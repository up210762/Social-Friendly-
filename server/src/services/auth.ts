import { RowDataPacket } from 'mysql2';
import { encryptPass } from './hash';
import { format } from '@formkit/tempo';
import { API_URL, MAIN_DB_PREFIX, PATH_DEFAULT_IMAGE } from '../keys';
import conn from '../db';

/**
 * Obtiene un solo usuario de la base de datos.
 *
 * @param  userSearch Identificador unico
 * @returns Usuario extraido de la base de datos
 */
export const findOneBy = async ({ email, username }: UserSearch) => {
  // Crear la sentencia SQL
  const SQL = `
    SELECT id, password FROM ${MAIN_DB_PREFIX}tr_user WHERE (username = ? OR email = ?) AND is_active=1;
  `;
  const [rows] = await conn.query<UserSQL[]>(SQL, [username, email]);
  const [user] = rows;

  return user;
};

export const createOne = async ({ fullname, username, email, password, birthday }: UserCreate) => {
  // Genero mi consulta SQL
  const SQL = `
    INSERT INTO ${MAIN_DB_PREFIX}tr_user (full_name, username,email,password,date_of_birthday)
    VALUES (?,?,?,?,?);
  `;

  const createProfile = `INSERT INTO ${MAIN_DB_PREFIX}tr_profile
  (id_user, id_gender, bio, location, url_photo) VALUES 
  (?,?,?,?,?);`;

  // Encripto la contraseña del usuario
  const newPassword = await encryptPass(password);
  const formatBirthday = format(birthday, 'YYYY-MM-DD', 'en');

  // Ejecuto la respuesta SQL
  const [resp]: any = await conn.execute(SQL, [fullname, username, email, newPassword, formatBirthday]);

  await conn.execute(createProfile, [resp['insertId'], null, null, null, `${PATH_DEFAULT_IMAGE}`])

  const apiUrl = new URL(`create-directory/${resp['insertId']}`, API_URL)

  const respAPI = await fetch(apiUrl, {
    method: 'POST'
  })

  if (respAPI.ok)
    return resp;

  return resp;
};

export interface UserSearch {
  username?: string;
  email?: string;
}

export interface UserCreate extends UserSearch {
  fullname: string;
  password: string;
  birthday: Date;
}

export interface User extends UserSearch {
  id: string;
  password: string;
  name: string;
  birthday: string;
  createdDate: string;
  updatedDate: string;
  active: boolean;
}

export interface UserSQL extends User, RowDataPacket { }
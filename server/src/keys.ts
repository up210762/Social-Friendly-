// Configuracion de variables de confifuración del proyecto
import { config } from 'dotenv';
config();

// Variables de Sistema
export const NODE_ENV = process.env.NODE_ENV!;
export const PORT = +process.env.PORT! || 3000;

// Variables de base de datos
export const DB_NAME = process.env.DB_NAME!;
export const DB_HOST = process.env.DB_HOST! || 'db';
export const DB_PORT = +process.env.DB_PORT! || 3306;
export const DB_USER = process.env.DB_USER! || 'root';
export const DB_PASS = process.env.DB_PASS!;
export const MAIN_DB_PREFIX = process.env.DB_PREFIX;
export const PATH_IMAGES = process.env.PATH_IMAGES;
export const PATH_DEFAULT_IMAGE = process.env.DEFAULT_IMAGE;
export const API_URL = process.env.API_URL;

// Variables para el JWT
export const JWT_SECRET = process.env.JWT_SERCRET || 'This is a test!';
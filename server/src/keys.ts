// Configuracion de variables de confifuración del proyecto
import { config } from 'dotenv';
config();

// Variables de Sistema
export const NODE_ENV = process.env.NODE_ENV!;
export const PORT = +process.env.PORT! || 3000;

// Variables de base de datos
export const DB_NAME = process.env.DB_NAME! || 'dbTodoApp';
export const DB_HOST = process.env.DB_HOST! || 'localhost';
export const DB_PORT = +process.env.DB_PORT! || 3306;
export const DB_USER = process.env.DB_USER! || 'root';
export const DB_PASS = process.env.DB_PASS! || '';

// Variables para el JWT
export const JWT_SECRET = process.env.JWT_SERCRET || 'This is a test!';

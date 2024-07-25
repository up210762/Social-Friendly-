import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../keys';

/**
 *  Genera un token de autentificación
 *
 * @param payload Información que se intercambiara en el token
 * @returns Resultado de la generación del Token
 */
export const generateToken = (payload: {[key: string]: number | string}) =>
	sign(payload, JWT_SECRET, {
		expiresIn: '1d'
	});

/**
 * Valida si el token generaro con las llaves de generacion es correcto.
 *
 * @param token Llave de autentificación
 * @returns Resultado de la verificación de token
 */
export const validateToken = (token: string) => verify(token, JWT_SECRET);


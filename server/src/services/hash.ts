// Dependencias
import { compare, hash, genSalt } from 'bcryptjs';

/**
 * Genera un Hash de un texto aleatorio
 *
 * @param {string} password Contraseña a encriptar
 * @returns constraseña Haseada
 */
export async function encryptPass(password: string) {
	// Se genera la llave para encriptar mi texto
	const salt = await genSalt(10);

	// Genero el hash de la contraseña
	return await hash(password, salt);
}

/**
 * Valida si los textos son iguales
 *
 * @param password Texto sin hashear
 * @param hash Texto con hash
 * @returns Estatus si los textos coinciden
 */
export async function validatePass(password: string, hash: string) {
	return await compare(password, hash);
}

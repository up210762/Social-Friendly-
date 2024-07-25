/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line no-unused-vars

// Dependencias
import {RequestHandler, Request, Response} from 'express';
import {validatePass} from '../services/hash';
import {generateToken} from '../services/jwt';
import { createOne, findOneBy } from '../services/auth';

// Schemas
import { UserLogin, UserRegister } from '../schemas/UserSchema';

/**
 *  Registra un usuario en la base de datos
 *
 * @param req Objeto Request de la libreria de express
 * @param res Objeto Response de la libreria de express
 */
export const registerUser: RequestHanddleRegister = async (req, res) => {
	try {
		// Recupero el cuerpo de la petición HTTP
		const { name, username, password, email, birthday } = req.body;

		const user = await findOneBy({username, email});

		if (user)
			return res.status(400).json({message: 'User is register'});

		const resp = await createOne({name, birthday, email, password, username});

		return res.json(resp);
	} catch (error) {
		console.log(error)
		return res.json({ message: 'Server error' });
	}

};

/**
 *  Realiza un loign de usuario en la base de datos
 *
 * @param req Objeto Request de la libreria de express
 * @param res Objeto Response de la libreria de express
 */
export const loginUser: RequestHanddleLogin = async (req, res) => {
	// Recuperar el usuario, email y contraseña del usuario
	const { username, email, password } = req.body;

	// Valido si existe el usuario
	const user = await findOneBy({ username, email });
	if (!user)
		return res.status(404).json({message: 'User not found!'});
	
	// Valido si la contraseña es correcta
	const isValid = await validatePass(password, user.password);
	if (!isValid)
		return res.status(403).json({message: 'Invalid Auth'});
	
	// Generarión de JWT
	const token = generateToken({id: user.id});

	// Respuesta al Cliente
	return res.json({token});
};

/**
 *  Realiza una Validacion de Base de datos
 *
 * @param req Objeto Request de la libreria de express
 * @param res Objeto Response de la libreria de express
 */
export const validarToken = (req: Request, res: Response) => res.status(204).json();

// Validacion de Cuerpo de la peticion
interface RequestHanddleRegister extends RequestHandler<any, any, UserRegister> {

}

interface RequestHanddleLogin extends RequestHandler<any, any, UserLogin> {

}
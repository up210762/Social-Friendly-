// Dependencias
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../keys';

export function authToken(req: Request, res: Response, next:NextFunction ) {
	try {
		const authHeader = req.headers?.authorization;

		if (!authHeader?.startsWith('Bearer')) {
			return res.status(401).json({message: 'Invalit prefix Token'});
		}

		const token = authHeader
			? authHeader.split(' ')[1]
			: undefined;

		// Valido que existe el token de la petición
		if (!token) {
			return res.status(401).json({message: 'Authentication Error'});
		}

		// Se valida que el token sea correcto
		const user = jwt.verify(token, JWT_SECRET) as User;

		// Guardo el usuario en la petición http
		req.user = {...user};

		// Es para salir del middleware!
		return next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(403).json({message: 'Invalid Token!'});
		}

		return res.status(400).json({message: 'Error in the files'});
	}
}

export interface User extends JwtPayload {
	id: string | number;
}

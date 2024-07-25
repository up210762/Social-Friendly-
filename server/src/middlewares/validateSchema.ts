/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';

export const validateSchema = (schema: z.ZodObject<any, any>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log(req.body);

			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorsMessage = error.errors.map(issue => ({
					message: `${issue.path.join(' ')} is ${issue.message}`
				}));

				res.status(400).json({ message: 'Invalid Data', details: errorsMessage });
			}
		}
	};
};
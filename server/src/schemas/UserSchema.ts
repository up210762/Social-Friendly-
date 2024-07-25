import { z } from 'zod';

export const UserRegisterSchema = z.object({
	name: z.string().min(10).max(50),
	username: z.string().min(5).max(20),
	password: z.string().min(4),
	email: z.string().email(),
	birthday: z.coerce.date()
});

export const UserLoginSchema = z.object({
	email: z.string().email().optional(),
	username: z.string().min(5).max(20).optional(),
	password: z.string().min(4)
});

export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserRegister = z.infer<typeof UserRegisterSchema>;
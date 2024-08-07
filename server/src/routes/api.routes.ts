// Dependencias
import { Router } from 'express';

// Middleware
import { authToken } from '../middlewares/bearerToken';
import { validateSchema } from '../middlewares/validateSchema';

// Controladores
import { loginUser, registerUser, validarToken } from '../controller/auth.controller';

// Schemas
import { UserLoginSchema, UserRegisterSchema } from '../schemas/UserSchema';
import { deleteUser, getManyUsers, getOneUser, updateUser } from '../controller/user.controller';
import { getInterest, getTypeInterest, getUserInterest, registerInterest } from '../controller/interests.controller';

// Instancia del Modulo Router
const router = Router();

// Auth routes
router.post('/register', validateSchema(UserRegisterSchema), registerUser);
router.post('/login', validateSchema(UserLoginSchema), loginUser);
router.post('/auth', authToken, validarToken);

router.route('/user')
	.all(authToken)
	.get(getOneUser)
	.patch(updateUser)
	.delete(deleteUser)

router.route('/users')
	.all(authToken)
	.get(getManyUsers)

router.route('/user-interest')
	.all(authToken)
	.get(getUserInterest)

router.route('/interest-type')
	.all(authToken)
	.get(getTypeInterest)

router.route('/interest')
	.all(authToken)
	.get(getInterest)

router.route('/register-interest')
	.all(authToken)
	.post(registerInterest)

// Exportación del Modulo
export default router;

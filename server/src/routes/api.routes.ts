// api.routes.ts

// api.routes.ts

// Dependencias
import { Router } from 'express';

// Middleware
import { authToken } from '../middlewares/bearerToken';
import { validateSchema } from '../middlewares/validateSchema';

// Controladores
import { loginUser, registerUser, validarToken } from '../controller/auth.controller';
import { deleteUser, getManyUsers, getOneUser, updateUser } from '../controller/user.controller';
import { getInterestByType, getTypeInterest, getUserInterestRoute, registerInterest } from '../controller/interests.controller';
import { createLike, getLikes, checkLikeExists } from '../controller/like.controller';  // Importa el nuevo controlador

// Schemas
import { UserLoginSchema, UserRegisterSchema } from '../schemas/UserSchema';

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
  .delete(deleteUser);

router.route('/users')
  .all(authToken)
  .get(getManyUsers);

router.route('/user-interest/:id')
	.all(authToken)
	.get(getUserInterestRoute)

router.route('/interest-types')
  .all(authToken)
  .get(getTypeInterest);

router.route('/interests')
	.all(authToken)
	.get(getInterestByType)

router.route('/register-interest')
  .all(authToken)
  .post(registerInterest);

router.route('/like')
  .all(authToken)
  .post(createLike);

router.route('/likes')
  .all(authToken)
  .get(getLikes);

router.route('/likes/check')  // Nueva ruta para verificar si existe un like
  .all(authToken)
  .get(checkLikeExists)// Añade el controlador para la nueva ruta
  .post(registerInterest);

router.route('/like')
  .all(authToken)
  .post(createLike);

router.route('/likes')
  .all(authToken)
  .get(getLikes);

router.route('/likes/check')  // Nueva ruta para verificar si existe un like
  .all(authToken)
  .get(checkLikeExists);  // Añade el controlador para la nueva ruta

// Exportación del Modulo
export default router;

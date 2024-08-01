// Dependencias
import { Router } from 'express';

// Middleware
import { authToken } from '../middlewares/bearerToken';
import { validateSchema } from '../middlewares/validateSchema';

// Controladores
import { loginUser, registerUser, validarToken } from '../controller/auth.controller';
import { 
	createTask,
	deleteTask,
	getAllTasks,
	getOneTask,
	updateTask
} from '../controller/task.controller';

// Schemas
import {UserLoginSchema, UserRegisterSchema} from '../schemas/UserSchema';
import { deleteUser, getManyUsers, getOneUser, updateUser } from '../controller/user.controller';

// Instancia del Modulo Router
const router = Router();

// Auth routes
router.post('/register', validateSchema(UserRegisterSchema) ,registerUser);
router.post('/login', validateSchema(UserLoginSchema) ,loginUser);
router.post('/auth', authToken ,validarToken);

// router.route('/task')
// 	.all(authToken)
// 	.get(getAllTasks)
// 	.post(createTask);

// router.route('/task/:id')
// 	.all(authToken)
// 	.get(getOneTask)
// 	.patch(updateTask)
// 	.delete(deleteTask);

router.route('/user')
	.all(authToken)
	.get(getOneUser)
	.patch(updateUser)
	.delete(deleteUser)

router.route('/users')
	.all(authToken)
	.get(getManyUsers)
	
// Exportación del Modulo
export default router;

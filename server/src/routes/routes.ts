// Dependencias
import {Router} from 'express';

// eslint-disable-next-line new-cap
const router = Router();

// Router.get('/', (req, res) => {
//     res.send("Soy Rogelio");
// });

router.get('/', (request, response) => {
	response.send('Soy Rogelio');
});

router.get('/:name', (req, res) => {
	const {name} = req.params; // Recuperar el valor de la URL
	const {type} = req.query;

	console.log({name, type});

	res.send('Enviado!!!');
});

router.get('/ping', (req, res) => {
	res.status(200).send(req.headers);
});

export default router;

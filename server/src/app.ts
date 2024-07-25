// Dependencias
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {join} from 'node:path';
import {createWriteStream} from 'fs';

import {NODE_ENV} from './keys';

// Routas de la aplicacin
import mainRoutes from './routes/routes';
import apiRoutes from './routes/api.routes';

// Instancia del objeto de express
const app = express();

// Middleware
app.use(cors());

if (['dev', 'test'].includes(NODE_ENV)) {
	app.use(morgan('dev'));
} else {
	app.use(morgan('combined', {
		stream: createWriteStream(join(__dirname, 'log', 'access.log')),
	}));

	app.use(morgan('combined', {
		skip: (_, res) => res.statusCode < 400,
		stream: createWriteStream(join(__dirname, 'log', 'error.log')),
	}));
}

app.use(express.json()); // Enternder JSON -> application/json
app.use(express.urlencoded({extended: false})); // Enterder form-urlencode -> application/form-urlencode

// Rutas de mi aplicación
app.use(mainRoutes);
app.use('/api', apiRoutes);

export default app;

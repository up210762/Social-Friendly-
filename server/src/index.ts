// Dependencias
import app from './app';

async function main () {
	try {
		app.listen(3000, () => console.log('Server is working!!!!'));

		// const [rows] = await conn.query("SELECT NOW() FROM DUAL;");
		// console.log("from listen!!!", rows[0]);
	} catch (error) {
		console.log(error);
	}
}

// Ejecución de nuestro main
main();

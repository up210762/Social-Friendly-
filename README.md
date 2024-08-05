# 
# Social-Friendly-
Es una red social que te permite contactar con personas con intereses similares.

### Instalación
1. Clonar el repositorio dentro del servidor.
2. Crear la base de datos e importar las tablas que se encuentran en la carpeta "db/".
3. Entrar a las carpetas "server/" y "client/", y ejecutar el comando "npm i".
4. Posteriormente, en las carpetas mencionadas en el punto anterior se deberá ejecutar el comando npm run start (si se quiere ejecutar en el entorno de producción), o el comando npm run dev (si se quiere ejecutar en el entorno de desarrollo).
6. Instalar python (y pip), e instalar las dependencias para iniciar el programa. Ejecutar el siguiente comando: pip3 install python-dotenv flask-cors flask pymysql
5. Posicionarse dentro de la carpeta de api y ejecutar el programa con el siguiente comando: pyhton3 index.py


##
### Dotenv del directorio "server/"
DB_NAME=db_social_friendly
DB_HOST=localhost
DB_PORT=3306
DB_USER=
DB_PASS=
DB_PREFIX=sf_

PATH_IMAGES=/public/user_images/
DEFAULT_IMAGE=/public/default/avatar.png
API_URL=http://localhost:5000/api/

JWT_SECRET=


##
### Dotenv del directorio "api/"
//# Global secret key
SECRET_KEY=

//# Paths
INPUT_FILES=images/

//# Database params
HOST=localhost
USER=
PASSWORD=
DATABASE=db_social_friendly
DB_PREFIX=sf_




##
### Cambios en la base de datos
RENAME TABLE db_social_friendly.sf_tc_interest_name TO db_social_friendly.sf_tc_interest_name;

CREATE TABLE db_social_friendly.sf_tr_path_user (
	id INT auto_increment NULL,
	id_user INT NULL,
	`path` varchar(100) NULL,
	is_active BOOL DEFAULT 1 NULL,
	CONSTRAINT url_path_user_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;

ALTER TABLE db_social_friendly.sf_tr_path_user ADD CONSTRAINT sf_tr_path_user_sf_tr_user_FK FOREIGN KEY (id_user) REFERENCES db_social_friendly.sf_tr_user(id);


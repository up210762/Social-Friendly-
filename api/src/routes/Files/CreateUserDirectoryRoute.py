# Importación de módulos necesarios
import traceback
from flask import Blueprint, request, jsonify
from src.services.db.DatabaseConnection import connection
from src.services.UserInfo import get_user_info
from src.services.keys import MAIN_PATH, DB_PREFIX
import os

# Logger
from src.utils.Logger import Logger

# Creación de la estancia main (funcionamiento principal del módulo)
main = Blueprint('create_directory_blueprint', __name__)

# Definición de las rutas del módulo
@main.route('/', methods=['POST'])
def create_directory(id):
    try:
        conn = connection()
        cursor = conn.cursor()
        if request.method == 'POST':
            res = get_user_info(id)
            path = f'{MAIN_PATH}@{res}'
            os.mkdir(path)
            return jsonify("Directorio creado.")
        else:
            return jsonify("El método no es permitido."), 405
    except Exception as ex:
        Logger.add_to_log('error', traceback.format_exc())

        return jsonify("Error al cargar el directorio"), 406
# Importación de módulos necesarios
import traceback
from flask import Blueprint, request, jsonify
from datetime import datetime
from src.services.Files.UpdateFilesService import upload_image

# Logger
from src.utils.Logger import Logger

# Creación de la estancia main (funcionamiento principal del módulo)
main = Blueprint('insert_images_blueprint', __name__)

date = datetime.now()

# Definición de las rutas del módulo
@main.route('/', methods=['POST'])
def insert_images(id):
    try:
        if request.method == 'POST':
            if 'image' not in request.files and request.files['image'].filename == None:
                return jsonify("La petición no es válida."), 402    
            res = upload_image(id, request.files['image'])
            return jsonify(res), res['status']
        else:
            return jsonify("El método no es permitido."), 405
    except Exception as ex:
        Logger.add_to_log('error', traceback.format_exc())

        return jsonify("Error al cargar el archivo."), 406
import os, traceback
from src.utils.allowed_file import allowed_file
from dotenv import load_dotenv
from werkzeug.utils import secure_filename

# Se carga la estancia dotenv para obtener los valores del archivo .env
load_dotenv()

# Carga de la ruta para subit los archivos
UPLOAD_FOLDER = os.getenv('INPUT_FILES')

def validate_files(file):
    if file.filename:
        if file.filename == '':
            return "No se encontó alguna selección de archivo.", False

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)

        file.save(os.path.join(UPLOAD_FOLDER, filename))

        return filename, True
    else:
        return "No es posible realizar esto", False
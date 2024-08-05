from flask import Blueprint, send_file

main = Blueprint('download_files_blueprint', __name__)

@main.route('/', methods=['GET'])
def descargar_archivo(file, path):
    ruta_archivo = f'{path}/{file}'
    return send_file(ruta_archivo, as_attachment=True)

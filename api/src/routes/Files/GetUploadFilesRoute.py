from flask import Blueprint, jsonify, send_from_directory
from src.services.UserInfo import get_user_info
from src.services.keys import MAIN_PATH
import os

main = Blueprint('get_upload_files_blueprint', __name__)

@main.route('/', methods=['GET'])
def get_files(id):
    try:
        user = get_user_info(id)
        files = os.scandir(f"{MAIN_PATH}@{user}")
        return_files = []
        for file in files:
            if file.name != '.org':
                return_files.append(file.name)
        return jsonify(return_files)
    except:
        return jsonify(f"No existe el directorio."), 500
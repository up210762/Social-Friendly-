from flask import Blueprint, jsonify, request
import os

main = Blueprint('write_files_blueprint', __name__)

@main.route('/', methods=['GET'])
def write_file():
    try:
        return jsonify("Hecho")
    except Exception as ex:
        print(ex)
        return jsonify("Error"), 500
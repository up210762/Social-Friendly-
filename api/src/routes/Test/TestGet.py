from flask import Blueprint, jsonify, request

main = Blueprint('test_get_blueprint', __name__)

@main.route('/', methods=['GET'])
def test_get():
    if request.method == "GET":
        if request.headers.get('Authorization'):
            return jsonify("Tienes conexión con el servidor en el método GET.")
        return jsonify("Error de validación."), 401
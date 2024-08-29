from flask import Blueprint, jsonify, request

main = Blueprint('test_put_blueprint', __name__)

@main.route('/', methods=['PUT'])
def test_put():
    if request.method == "PUT":
        if request.headers.get('Authorization'):
            return jsonify("Tienes conexión con el servidor en el método PUT.")
        return jsonify("Error de validación."), 401

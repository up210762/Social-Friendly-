from flask import Blueprint, jsonify, request, Response

main = Blueprint('test_delete_blueprint', __name__)

@main.route('/', methods=['DELETE'])
def test_delete():
    if request.method == "DELETE":
        if request.headers.get('Authorization'):
            return jsonify("Tienes conexión con el servidor en el método DELETE.")
        return jsonify("Error de validación."), 401
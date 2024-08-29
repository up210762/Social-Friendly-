from flask import Blueprint, jsonify, request

main = Blueprint('test_post_blueprint', __name__)

@main.route('/', methods=['POST'])
def test_post():
    if request.method == "POST":
        if request.headers.get('Authorization'):
            return jsonify("Tienes conexión con el servidor en el método POST.")
        return jsonify("Error de validación."), 401
            
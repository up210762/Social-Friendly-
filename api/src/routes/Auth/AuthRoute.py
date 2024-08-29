from flask import Blueprint, jsonify, request

main = Blueprint('login_blueprint', __name__)

@main.route('/', methods=['POST'])
def login():
    if request.method == "POST":
        return jsonify("Puedes obtener autorización.")

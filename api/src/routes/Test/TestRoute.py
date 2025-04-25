from flask import Blueprint, jsonify, request
from src.services.Test.TestMethodsService import test_service

main = Blueprint('test_blueprint', __name__)

@main.route('/', methods=['GET','POST', 'DELETE', 'PUT'])
def test_route():
    if request.headers.get('Authorization') == '':
        return jsonify({
            'status': 401,
            'message': 'No estás autorizado!'
        }), 401
    res = test_service(request.method)
    return res
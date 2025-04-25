from flask import jsonify

def test_service(method):
    if (method == 'GET'):
        return jsonify({
            "status": 200,
            "message": "Tienes conexión con el servidor en el método GET."
            })
    elif (method == 'POST'):
        return jsonify({
            "status": 200,
            "message": "Tienes conexión con el servidor en el método POST."
            })
    elif (method == 'PUT'):
        return jsonify({
            "status": 200,
            "message": "Tienes conexión con el servidor en el método PUT."
            })
    elif (method == 'DELETE'):
        return jsonify({
            "status": 200,
            "message": "Tienes conexión con el servidor en el método DELETE."
            })
    else:
        return jsonify({
            "status": 401,
            "message": "No se ha podido procesar la petición."
        })
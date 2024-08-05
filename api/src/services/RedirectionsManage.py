from flask import jsonify
def handle_options():
    # Configurar los encabezados CORS adecuados para las solicitudes OPTIONS
    response = jsonify()
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Methods'] = 'DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

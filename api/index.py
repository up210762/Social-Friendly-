from config import config
from src import init_app

try:
    configuration = config['development']
    app = init_app(configuration)
    if __name__ == '__main__':
        ## Desarrollo
        app.run()
        ## Producción
        # app.run(host="0.0.0.0")
except Exception as ex:
    print("Error al iniciar el servidor.")

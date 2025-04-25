from flask import Flask, jsonify
from flask_cors import CORS

import traceback

from .routes.Files import (CreateUserDirectoryRoute, 
                           DownloadFilesRoute, 
                           GetUploadFilesRoute, 
                           UploadImageRoutes,
                           DeleteFilesRoute)

from .routes.Test import TestRoute

from .routes.Auth import AuthRoute

from src.utils.Logger import Logger

try:
    app = Flask(__name__)
        
    def init_app(config):
        try:
            # Configuration
            app.config.from_object(config)

            # Blueprints
            app.register_blueprint(GetUploadFilesRoute.main, url_prefix='/api/get-upload-files/<id>')
            app.register_blueprint(CreateUserDirectoryRoute.main, url_prefix='/api/create-directory/<id>')
            app.register_blueprint(UploadImageRoutes.main, url_prefix='/api/upload-image/<id>')
            app.register_blueprint(DownloadFilesRoute.main, url_prefix='/api/download/<path>/<file>')
            app.register_blueprint(DeleteFilesRoute.main, url_prefix='/api/delete-file/<filename>')
            app.register_blueprint(TestRoute.main, url_prefix='/api/test')
            app.register_blueprint(AuthRoute.main, url_prefix='/api/api-auth')
            
            return app
        except Exception as ex:
            Logger.add_to_log('error', traceback.format_exc())
except Exception as ex:
    Logger.add_to_log('Error al cargar las dependencias en el archivo de configuración de rutas', traceback.format_exc())

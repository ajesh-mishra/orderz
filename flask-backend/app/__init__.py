from flask import Flask
from flask_cors import CORS

from app.extensions import db
from app.routes.catalog import catalog
from app.routes.common import utility
from app.routes.menu import menu


def create_app() -> Flask:
    """
    Creates a Flask app and registers Blueprints
    """
    app: Flask = Flask(__name__)
    CORS(app)

    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    # migrate.init_app(app, db)

    '''
    You can only test the first blueprint that is registered in SwaggerUI.
    '''
    app.register_blueprint(utility)
    app.register_blueprint(menu)
    app.register_blueprint(catalog)

    return app

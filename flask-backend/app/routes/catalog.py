from flask import Blueprint, jsonify, Response, request
from flask_restx import Api, Resource, fields
# from flask_restx.cors import crossdomain
from sqlalchemy.exc import IntegrityError

from app.extensions import db
from app.models import Catalog as CatalogModel

catalog: Blueprint = Blueprint('catalog', __name__)
api = Api(catalog)
ns = api.namespace('catalog', description='Catalog Operations')

catalog_fields = api.model('Resource', {
    'id': fields.Integer,
    'name': fields.String,
    'is_veg': fields.Boolean,
    'price': fields.Integer,
    'description': fields.String,
})


@ns.route('/')
class Catalog(Resource):

    @staticmethod
    # @crossdomain(origin='*')
    def get() -> Response:
        """
        Fetches all the items from the Catalog table
        """
        result: list[CatalogModel] = CatalogModel.query.all()
        return jsonify(result)

    @staticmethod
    @api.expect(catalog_fields)
    # @crossdomain(origin='*')
    def post() -> tuple[str, int]:
        """
        Adds a new item to the Catalog Table
        """
        r = request.get_json()
        item = CatalogModel(**r)

        try:
            db.session.add(item)
            db.session.commit()
        except IntegrityError:
            return f'Duplicate Value Found', 409
        except Exception as e:
            return f'Database Error: {e}', 400

        return f'Item {r.get("name")} added to the Catalog', 201

    @staticmethod
    @api.expect(catalog_fields)
    # @crossdomain(origin='*')
    def patch() -> tuple[str, int]:
        """
        Updates a particular item in the Catalog table
        """
        r = request.get_json()
        _id = r.pop('id')

        try:
            CatalogModel.query.filter_by(id=_id).update(r)
            db.session.commit()
        except Exception as e:
            return f'Database Error: {e}', 400

        return f'Item {id} updated!', 201

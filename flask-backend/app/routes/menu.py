from flask import Blueprint, jsonify, Response, request
from flask_restx import Api, Resource, fields, reqparse
# from flask_restx.cors import crossdomain
from sqlalchemy.exc import IntegrityError

from app.extensions import db
from app.models import Catalog as CatalogModel
from app.models import Menu as MenuModel

menu = Blueprint('menu', __name__)
api = Api(menu)
ns = api.namespace('menu', description='Menu Operations')

parser = reqparse.RequestParser()
parser.add_argument('date', type=int, help='Date in the format YYYYMMDD')

menu_fields = api.model('Resource', {
    'date': fields.Integer,
    'items': fields.String,
})


@ns.route('/')
class Menu(Resource):

    @staticmethod
    @api.doc(parser=parser)
    # @crossdomain(origin='*')
    def get() -> Response:
        """
        Fetches all the items in the menu for a given day
        """
        args = parser.parse_args()
        menu_list: MenuModel = MenuModel.query.filter_by(date=args.date).first()
        result: list[CatalogModel] = []

        if menu_list is None:
            return result

        for _id in menu_list.items.split(','):
            _id = int(_id)
            item: CatalogModel = CatalogModel.query.filter_by(id=_id).first()
            result.append(item)

        return jsonify(result)

    @staticmethod
    @api.expect(menu_fields)
    # @crossdomain(origin='*')
    def post() -> tuple[str, int]:
        """
        Adds a new item to the Menu table
        """
        r = request.get_json()
        item = MenuModel(**r)

        try:
            db.session.add(item)
            db.session.commit()
        except IntegrityError:
            return f'Duplicate Value Found', 409
        except Exception as e:
            return f'Database Error: {e}', 400

        return f'Item {r.get("date")} added to the Menu', 201

    @staticmethod
    @api.expect(menu_fields)
    # @crossdomain(origin='*')
    def patch() -> tuple[str, int]:
        """
        Updates a particular item in the Menu table
        """
        r = request.get_json()
        _date = r.pop('date')

        try:
            MenuModel.query.filter_by(date=_date).update(r)
            db.session.commit()
        except Exception as e:
            return f'Database Error: {e}', 400

        return f'Item {_date} updated!', 201

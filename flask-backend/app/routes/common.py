from datetime import datetime, timedelta
from typing import Any

from flask import Blueprint
from flask_restx import Api, Resource
# from flask_restx.cors import crossdomain

from app.constants import WEEKDAY, MONTH

utility: Blueprint = Blueprint('common', __name__)
api = Api(utility)
ns = api.namespace('utility', description='Few Utility Routes')


@ns.route('/')
class Utility(Resource):

    # @crossdomain(origin='*')
    def get(self) -> list[Any]:
        """
        Returns a Calendar Window: 'current_window' which
        includes previous, current and next week from SUN to SAT
        """
        today: datetime = datetime.now()  # + timedelta(days=-80)
        day_of_week: int = today.weekday()

        if day_of_week == 6:
            start: int = -7
            end: int = 14
        else:
            start: int = (-1 * day_of_week) - 8
            end: int = (6 - day_of_week) + 8

        week: list[dict[str, int]] = []
        current_window: list[week] = []

        for index, day in enumerate(range(start, end), start=1):
            d: datetime = today + timedelta(days=day)
            week.append({
                'weekday': WEEKDAY[d.weekday()],
                'day': d.day,
                'month': d.month,
                'month_str': MONTH[d.month],
                'year': d.year,
                'is_current': today.day == d.day
            })
            if index % 7 == 0:
                current_window.extend(week)
                week = []

        return current_window

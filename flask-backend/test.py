from datetime import datetime, timedelta
from pprint import pprint

week_day: tuple[str, str, str, str, str, str, str] = ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN')
today: datetime = datetime.now()  # + timedelta(days=-80)
day_of_week: int = today.weekday()

current_date = {
    'weekday': week_day[today.weekday()],
    'day': today.day,
    'month': today.month,
    'year': today.year,
}

if day_of_week != 6:
    start: int = (-1 * day_of_week) - 8
    end: int = (6 - day_of_week) + 8
else:
    start: int = -7
    end: int = 14

week: list[dict[str, int]] = []
current_window: list[week] = []

for index, day in enumerate(range(start, end), start=1):
    d: datetime = today + timedelta(days=day)
    week.append({
        'weekday': week_day[d.weekday()],
        'day': d.day,
        'month': d.month,
        'year': d.year,
    })
    if index % 7 == 0:
        current_window.append(week)
        week = []

pprint(current_window)
pprint(current_date)

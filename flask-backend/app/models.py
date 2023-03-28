from dataclasses import dataclass
from datetime import datetime

from app.extensions import db


@dataclass
class LastUpdated(db.Model):
    id: int
    date: datetime

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)


@dataclass
class Catalog(db.Model):
    id: int | None
    name: str
    is_veg: bool
    price: int
    description: str

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    is_veg = db.Column(db.Boolean, default=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text)


@dataclass
class Menu(db.Model):
    date: int
    items: str

    date = db.Column(db.Integer, primary_key=True)
    items = db.Column(db.String(100), nullable=False)

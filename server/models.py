# models.py

from db import db
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    property_type = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)

    def serialize(self):
        return {
            'id': self.id,
            'property_type': self.property_type,
            'location': self.location,
            'description': self.description
        }

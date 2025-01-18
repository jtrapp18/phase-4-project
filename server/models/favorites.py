from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from ..config import db

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    cookie_id = db.Column(db.Integer, db.ForeignKey('cookies.id'))

    def __repr__(self):
        return f'<Favorite {self.id}, Cookie id: {self.cookie_id}, User id: {self.user_id}>'
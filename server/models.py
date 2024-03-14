
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import *

class User(db.Model):
    __tablename__= "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

class Project(db.Model):
    __tablename__= "projects"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

class Play(db.Model):
    __tablename__= "plays"
    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.String, nullable=False)
    quarter = db.Column(db.Integer, nullable=False)
    clock_start = db.Column(db.String, nullable=False)
    clock_stop = db.Column(db.String, nullable=False)
    start = db.Column(db.Integer, nullable=False)
    stop = db.Column(db.Integer, nullable=False)
    player = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)
    quality = db.Column(db.Float)
    assist = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String)

class Player(db.Model):
    __tablename__="players"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    level = db.Column(db.String, nullable=False)
    jersey = db.Column(db.Integer, nullable=False)
    year = db.Column(db.String, nullable=False)

class Game(db.Model):
    __tablename__="games"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    level = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
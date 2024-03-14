
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import *

class PlayPlayer(db.Model):
    __tablename__="play_player_table"

    play_id = db.Column(db.Integer, db.ForeignKey('plays.id'), primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'), primary_key=True)

class PlayGame(db.Model):
    __tablename__="play_game_table"

    play_id = db.Column(db.Integer, db.ForeignKey('plays.id'), primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), primary_key=True)

class User(db.Model):
    __tablename__= "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    projects = db.relationship("Project", back_populates="users")

class Project(db.Model):
    __tablename__= "projects"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    users = db.relationship("User", back_populates="projects")
    plays = db.relationship("Play", back_populates="prjects")


    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

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

    project = db.relationship("Project", back_populates="plays")

    players = db.relationship("Player", secondary=PlayPlayer, back_populates="plays")
    games = db.relationship("Game", secondary=PlayGame , back_populates="plays")

    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

class Player(db.Model):
    __tablename__="players"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    level = db.Column(db.String, nullable=False)
    jersey = db.Column(db.Integer, nullable=False)
    year = db.Column(db.String, nullable=False)

    plays = db.relationship("Play", secondary=PlayPlayer, back_populates="players")
    play_id = db.Column(db.Integer, db.ForeignKey('plays.id'))



class Game(db.Model):
    __tablename__="games"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    level = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)

    plays = db.relationship("Play", secondary=PlayGame, back_populates="games")
    play_id = db.Column(db.Integer, db.ForeignKey('plays.id'))



    





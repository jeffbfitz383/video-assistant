
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import *
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


bcrypt = Bcrypt()

class PlayPlayer(db.Model):
    __tablename__="play_player_table"

    play_id = db.Column(db.Integer, db.ForeignKey('plays.id'), primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'), primary_key=True)

class PlayGame(db.Model):
    __tablename__="play_game_table"

    play_id = db.Column(db.Integer, db.ForeignKey('plays.id'), primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), primary_key=True)

class User(db.Model, SerializerMixin):
    __tablename__= "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
   

    projects = db.relationship("Project", back_populates="users")
    _password_hash = db.Column(db.String, nullable=False)
    serialize_rules = ("-projects.users",)




    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password.encode("utf-8"))


class Project(db.Model, SerializerMixin):
    __tablename__= "projects"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    users = db.relationship("User", back_populates="projects")
    plays = db.relationship("Play", back_populates="projects")



    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    serialize_rules = ("-users.projects", "-plays.projects")

class Play(db.Model, SerializerMixin):
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
    used = db.Column(db.Integer)

    projects = db.relationship("Project", back_populates="plays")

    players = db.relationship("Player", secondary=PlayPlayer.__table__, back_populates="plays")
    games = db.relationship("Game", secondary=PlayGame.__table__ , back_populates="plays")

    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    serialize_rules = ("-players.plays", "-projects.plays", "-games.plays")

    @validates('level')
    def validate_level(self, key, level):
        if level not in ["V", "JV", "C", "F"]:
            raise ValueError(f"Invalid level: {level}. Level must be 'V', 'JV', 'C', or 'F'.")
        return level

    # @validates('quarter')
    # def validate_quarter(self, key, quarter):
    #     if quarter not in [1, 2, 3, 4, 5]:
    #         raise ValueError(f"Invalid quarter: {quarter}. Quarter must be '1', '2', '3', '4' or '5'.")
    #     return quarter

class Player(db.Model, SerializerMixin):
    __tablename__="players"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    level = db.Column(db.String, nullable=False)
    jersey = db.Column(db.Integer, nullable=False)
    year = db.Column(db.String, nullable=False)

    plays = db.relationship("Play", secondary=PlayPlayer.__table__, back_populates="players")
    play_id = db.Column(db.Integer, db.ForeignKey('plays.id'))

    serialize_rules = ("-plays.player",)



class Game(db.Model, SerializerMixin):
    __tablename__="games"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    level = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)

    plays = db.relationship("Play", secondary=PlayGame.__table__, back_populates="games")
    play_id = db.Column(db.Integer, db.ForeignKey('plays.id'))

    serialize_rules = ("-plays.game",)


    





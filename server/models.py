
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


    @validates('name')
    def validate_name(self, key, name):
        if not isinstance(name, str) or not 1<= len(name):
            raise ValueError(f"Invalid name: {name}. name must be a string of at least 4 characters.")
        return name


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

    @validates('quarter')
    def validate_quarter(self, key, quarter):
        if quarter not in [1, 2, 3, 4, 5]:
            raise ValueError(f"Invalid quarter: {quarter}. Quarter must be '1', '2', '3', '4' or '5'.")
        return quarter

    @validates('clock_start')
    def validate_clock_start(self, key, clock_start):
        if not isinstance(clock_start, str):
            raise ValueError(f"Invalid clock_start: {clock_start}. clock_start must be a string of at least 4 characters.")
        return clock_start

    @validates('clock_stop')
    def validate_clock_stop(self, key, clock_stop):
        if not isinstance(clock_stop, str):
            raise ValueError(f"Invalid clock_stop: {clock_stop}. clock_stop must be a string of at least 4 characters.")
        return clock_stop

    
    @validates('start')
    def validate_start(self, key, start):
        if not isinstance(start, str):
            raise ValueError(f"Invalid start: {start}. start must be an integer")
        return start

    @validates('stop')
    def validate_stop(self, key, stop):
        if not isinstance(stop, str):
            raise ValueError(f"Invalid stop: {stop}. start must be an integer")
        return stop

    @validates('player')
    def validate_player(self, key, player):
        if player not in ["0", "1", "2", "3", "4", "5", "10", "11", "12", "13", "14", "1", "20", "21", "22", "23", "24", "25", "30", "31", "32", "33", "34", "35"]:
            raise ValueError(f"Invalid player: {player}. Jersey #s must be between 0 and 35 and not contain any digits higher than 5.")
        return player


    @validates('description')
    def validate_description(self, key, description):
        if description not in["3 point","Layup","Field Goal","Put Back","Shot","Rebound","Block","Swat","Steal","FF","2FF","Charge","Tip Off","Rebound","Other"]:
            raise ValueError(f"Invalid play description: {description}. Please select on of the items in the drop down")
        return description

    @validates('quality')
    def validate_quality(self, key, quality): 
        if not isinstance(quality, float) or not 0.0 <= quality <= 10.0:
            raise ValueError(f"Invalid quality: {quality}. quality must be an float between 0 and 10.0")
        return quality



    ##### no validation for comment.  Can be anything or can be left blank.
    #### no validati for used.  Autosets to 0 during play substatiation.

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


    





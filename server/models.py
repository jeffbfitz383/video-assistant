from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
import datetime
from sqlalchemy import Column, Integer, String, Float, ForeignKey, create_engine, Table, Date, Time
from sqlalchemy.orm import Session, declarative_base, relationship, sessionmaker, validates
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
#5 )pip install flask_bcrypt and import bcrypt and wrap the app in bcrypt, import hybrid property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt
from datetime import datetime
import datetime

from config import db

Base = declarative_base()

# class A_table():
#     __tablename__="a_tables"
#   a_primary =Column(Integer, primary_key=True)
#   a_column =Column(String, nullable=False)
    # a_relationship = relationship("Other_table", secondary=join_table, back_populates="a_t")

play_player_table = Table('play_player', Base.metadata,
    Column('play_id', Integer, ForeignKey('plays.id'), primary_key=True),
    Column('player_id', Integer, ForeignKey('players.id'), primary_key=True)
)

play_game_table = Table('play_game', Base.metadata,
    Column('play_id', Integer, ForeignKey('plays.id'), primary_key=True),
    Column('game_id', Integer, ForeignKey('games.id'), primary_key=True)
)

play_playtype_table = Table('play_playtype', Base.metadata,
    Column('play_id', Integer, ForeignKey('plays.id'), primary_key=True),
    Column('play_type_id', Integer, ForeignKey('play_types.id'), primary_key=True)
)

class User(Base):
    __tablename__= "users"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    
    projects = relationship("Project", back_populates="users")


class Project(Base):
    __tablename__= "projects"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    users = relationship("User", back_populates="projects")
    plays = relationship("Play", back_populates="prjects")


    user_id = Column(Integer, ForeignKey('users.id'))


class Play(Base):
    __tablename__= "plays"
    id = Column(Integer, primary_key=True)
    level = Column(String, nullable=False)
    quarter = Column(Integer, nullable=False)
    clock_start = Column(String, nullable=False)
    clock_stop = Column(String, nullable=False)
    start = Column(Integer, nullable=False)
    stop = Column(Integer, nullable=False)
    quality = Column(Float)
    assist = Column(Integer, nullable=False)
    comment = Column(String)

    project = relationship("Project", back_populates="plays")

    players = relationship("Player", secondary=play_player_table , back_populates="plays")
    games = relationship("Game", secondary=play_game_table , back_populates="plays")
    play_types = relationship("Game", secondary=play_playtype_table , back_populates="plays")
    

    project_id = Column(Integer, ForeignKey('projects.id'))



    

    

    

    #Todo game relationship and foreign key id
    #Todo playtype relationship and foreing key
    #Todo player relationship and foreing key

class Player(Base):
    __tablename__="players"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    level = Column(String, nullable=False)
    jersey = Column(Integer, nullable=False)
    year = Column(String, nullable=False)

    plays = relationship("Play", secondary=play_player_table, back_populates="players")
    play_id = Column(Integer, ForeignKey('plays.id'))



class Game(Base):
    __tablename__="games"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    level = Column(String, nullable=False)
    date = Column(String, nullable=False)

    plays = relationship("Play", secondary=play_game_table, back_populates="games")
    play_id = Column(Integer, ForeignKey('plays.id'))
    


class Playtype(Base):
    __tablename__="play_types"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    plays = relationship("Play", secondary=play_playtype_table, back_populates="playtypes")
    play_id = Column(Integer, ForeignKey('plays.id'))
    
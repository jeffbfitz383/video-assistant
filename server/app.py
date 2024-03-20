#!/usr/bin/env python3

# Standard library imports
from models import *
# Remote library imports
from flask import request, jsonify, session, make_response
from flask_restful import Resource
from werkzeug.security import check_password_hash

# Local imports
# from config import app, db, api
from config import *
from models import db, PlayPlayer, PlayGame, User, Project, Play, Player, Game
from funct import hello




# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


@app.before_request
def check_session():
    if session.get("user_id") is None:
        session["user_id"] = None

    else:
        print("User is logged in")


class CheckSession(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')


class SignUp(Resource):
    def post(self):
        form_json = request.get_json()
        new_user = User(
            name = form_json["name"],
            password = form_json["password"]
        )
        db.session.add(new_user)
        db.session.commit()

api.add_resource(SignUp, '/Signup')

class LogIn(Resource):
    def post(self):
        form_json = request.get_json()
        username = form_json["name"]
        password = form_json["password"]
        user = User.query.filter_by(name=username).first()
        if user and user.authenticate(password):
            print(user)
            # Create a dictionary for the response data
            session["user_id"] = user.id
            # Use jsonify to serialize and return the response data
            return make_response(user.to_dict(), 200)
        else:
            response_data = {"message": "Invalid username or password"}
            return "", 401

api.add_resource(LogIn, '/Login')

class LogOut(Resource):
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None
        return {}, 204
    
api.add_resource(LogOut, "/UserLoggedin")

class CreateProject(Resource):
    def post(self):
        # form_json = request.get_json()
        # new_project = Project(
        #     name = form_json["name"],
        #     user_id =form_json["user_id"]
        # )
        # db.session.add(new_project)
        # db.session.commit()
        form_json = request.get_json()
        project_name = form_json["name"]

        # Get the user ID from the session (assuming it's stored there during login)
        user_id = session.get("user_id")

        # Create a new project with the provided name and user ID
        new_project = Project(
            name=project_name,
            user_id=user_id
        )

        # Add the project to the database
        db.session.add(new_project)
        db.session.commit()

        return {"message": "Project created successfully"}, 201


api.add_resource(CreateProject, '/Addproject')


class CreatePlay(Resource):
    def post(self):
        form_json = request.get_json()

        play_level = form_json["level"]
        play_quarter = form_json["quarter"]
        play_clock_start = form_json["clock_start"]
        play_clock_stop = form_json["clock_stop"]
        play_start = form_json["start"]
        play_stop = form_json["end"]
        play_player = form_json["player"]
        play_description = form_json["description"]
        play_quality = form_json["quality"]
        play_assist = form_json["assist"]
        play_comment = form_json['comment']
        

        new_play = Play(
            level = play_level,
            quarter = play_quarter,
            clock_start = play_clock_start,
            clock_stop = play_clock_stop,
            start = play_start,
            stop = play_stop,
            player  =play_player,
            description =play_description,
            quality = play_quality,
            assist=play_assist,
            comment=play_comment
             )
       
        db.session.add(new_play)
        db.session.commit()

api.add_resource(CreatePlay, '/Addplay')
        
        
class GetPlay(Resource):
    def get(self):
        all_plays = Play.query.all()  


        plays_data = []
        for play in all_plays:
            play_dict = {
                'id': play.id,
                'level': play.level,
                'quarter': play.quarter,
                'clock_start': play.clock_start,
                'clock_stop': play.clock_stop,
                'start': play.start,
                'stop': play.stop,
                'player': play.player,
                'description': play.description,
                'quality': play.quality,
                'assist': play.assist,
                'comment': play.comment
            }
            plays_data.append(play_dict)

     
        return {'plays': plays_data}, 200


api.add_resource(GetPlay, '/Useplay')

class DeletePlay(Resource):
    def delete(self, id): 
        play = Play.query.filter_by(id=id).first()
        if play:
            db.session.delete(play)
            db.session.commit()
            return {"message": "Play deleted."}, 200 
        else:
            return {"message": "Play not found."}, 404

api.add_resource(DeletePlay, "/deleteplay/<int:id>") 







if __name__ == '__main__':
    app.run(port=5555, debug=True)


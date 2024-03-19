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

class CreateProject(Resource):
    def post(self):
        form_json = request.get_json()
        new_project = Project(
            name = form_json["name"],
            user_id =form_json["user_id"]
        )
        db.session.add(new_project)
        db.session.commit()


api.add_resource(CreateProject, '/Addproject')




if __name__ == '__main__':
    app.run(port=5555, debug=True)


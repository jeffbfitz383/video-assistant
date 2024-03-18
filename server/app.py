#!/usr/bin/env python3

# Standard library imports
from models import *
# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
# from config import app, db, api
from config import *
from models import db, PlayPlayer, PlayGame, User, Project, Play, Player, Game



# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

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


if __name__ == '__main__':
    app.run(port=5555, debug=True)


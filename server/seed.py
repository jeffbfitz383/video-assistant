#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Project, Play

if __name__ == '__main__':
    fake = Faker()


    with app.app_context():
        User.query.delete()
        Project.query.delete()
        Play.query.delete()
        Player.query.delete()

        taki = User(name="Taki", password="woof")
        jeff = User(name="Jeff", password="chakra")
        norm = User(name="Norm", password="cheese")

        Horizon2023 = Project(name="Horizon2023")
        Legacy2023 = Project(name="Legacy2023")

        play = Play(level="V", quarter=1, clock_start = "7:55", clock_stop = "7:50", start = 55, stop = 60, player = 12, description = "layup", quality = 10.0, assist = 11,  comment = "Use if nothing better" )
        play1 = Play(level="JV", quarter=2, clock_start = "7:50", clock_stop = "7:45", start = 60, stop = 65, player = 11, description = "2ff", quality = 8.1, assist = 10,  comment = "Use this one" )
        play2 = Play(level="C", quarter=3, clock_start = "7:45", clock_stop = "7:40", start = 65, stop = 70, player = 10, description = "ff", quality = 6.4, assist = 5,  comment = "Use if nothing better" )
        play3 = Play(level="V", quarter=4, clock_start = "7:40", clock_stop = "7:35", start = 70, stop = 75, player = 5, description = "block", quality = 4.9, assist = 4,  comment = "Use if nothing better" )
        play4 = Play(level="JV", quarter=5, clock_start = "7:35", clock_stop = "7:30", start = 75, stop = 80, player = 4, description = "steel", quality = 3.6, assist = 3,  comment = "Use if nothing better" )
        play5 = Play(level="C", quarter=1, clock_start = "7:30", clock_stop = "7:25", start = 80, stop = 85, player = 3, description = "swat", quality = 2.5, assist = 2,  comment = "Use if nothing better" )
        play6 = Play(level="V", quarter=2, clock_start = "7:25", clock_stop = "7:20", start = 85, stop = 90, player = 2, description = "putback", quality = 1.6, assist = 1,  comment = "Use if nothing better" )
        play7 = Play(level="JV", quarter=3, clock_start = "7:20", clock_stop = "7:15", start = 90, stop = 95, player = 1, description = "TP", quality = 0.3, assist = 55,  comment = "Use if nothing better" )
        play8 = Play(level="C", quarter=4, clock_start = "7:15", clock_stop = "7:10", start = 95, stop = 100, player = 55, description = "field goal", quality = 0.1, assist = 54,  comment = "Use if nothing better" )
        play9 = Play(level="V", quarter=5, clock_start = "7:10", clock_stop = "7:05 ", start = 100, stop = 105, player = 54, description = "rebound", quality = 10.0, assist = 53,  comment = "Use if nothing better" )

        playerA =Player()
        playerB =Player()
        playerB =Player()
        playerA =Player()
        playerB =Player()
        playerB =Player()
        playerA =Player()
        playerB =Player()
        playerB =Player()
        playerA =Player()
        playerB =Player()
        playerB =Player()


        db.session.add(taki)
        db.session.add(jeff)
        db.session.add(norm)

        db.session.add(play)

        db.session.add(Horizon2023) 
        db.session.add(Legacy2023) 

        db.session.add(play1)
        db.session.add(play2)
        db.session.add(play3)
        db.session.add(play4)
        db.session.add(play5)
        db.session.add(play6)
        db.session.add(play7)
        db.session.add(play8)
        db.session.add(play9)
        


        db.session.commit()
        print("Starting seed...")
        # Seed code goes here!

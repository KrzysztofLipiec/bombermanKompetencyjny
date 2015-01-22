import datetime
import logging
import os
import random
import re
from django.utils import simplejson
from google.appengine.api import channel
from google.appengine.api import users
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app


class Game(db.Model):
    """All the data we store for a game"""
    userX = db.UserProperty()
    userO = db.UserProperty()
    map = db.StringProperty()
    winner = db.StringProperty()


class MainPage(webapp.RequestHandler):
    """The main UI page, renders the 'index.html' template."""

    def get(self):
        """Renders the main page. When this page is shown, we create a new
        channel to push asynchronous updates to the client."""
        user = users.get_current_user()
        game_key = self.request.get('g')
        game = None
        mySign = None
        if user:
            if not game_key:
                game_key = user.user_id()
                mySign = 'X'
                game = Game(key_name=game_key,
                            userX=user,
                            map="[[0,0,0,2,0,0,2,2,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],[0,1,2,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,2,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,2,1,0,1,0],[0,0,0,0,0,0,0,0,0,2,2,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,2,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]")
                game.put()
            else:
                game = Game.get_by_key_name(game_key)
                if not game.userO:
                    mySign = 'O'
                    game.userO = user
                    game.put()

            game_link = 'http://localhost:8080/?g=' + game_key

            if game:
                token = channel.create_channel(user.user_id() + game_key)
                template_values = {'token': token,
                                   'me': user.user_id(),
                                   'mySign': mySign,
                                   'game_key': game_key,
                                   'game_link': game_link,
                }
                path = os.path.join(os.path.dirname(__file__), 'web/dist/index.html')

                self.response.out.write(template.render(path, template_values))
            else:
                self.response.out.write('No such game')
        else:
            self.redirect(users.create_login_url(self.request.uri))


class Opened(webapp.RequestHandler):
    def post(self):
        game = GameFromRequest(self.request).get_game()
        GameUpdater(game).send_update()


class Move(webapp.RequestHandler):
    def post(self):
        dir = self.request.get('direction')
        player = self.request.get('player')
        game = GameFromRequest(self.request).get_game()
        GameUpdater(game).move(dir, player)


class Action(webapp.RequestHandler):
    def post(self):
        action = self.request.get('action')
        player = self.request.get('player')
        game = GameFromRequest(self.request).get_game()
        GameUpdater(game).action(action, player)


class GameUpdater():
    game = None

    def __init__(self, game):
        self.game = game

    def action(self, action, player):
        response = {
            'action': action
        }
        message = simplejson.dumps(response)
        self.send_to_enemy(message, player)

    def send_to_enemy(self, message, player):
        if player == 'X':
            channel.send_message(self.game.userO.user_id() + self.game.key().id_or_name(), message)
        else:
            channel.send_message(self.game.userX.user_id() + self.game.key().id_or_name(), message)

    def move(self, dir, player):
        response = {
            'action': 'move',
            'dir': dir
        }
        message = simplejson.dumps(response)
        self.send_to_enemy(message, player)

    def get_game_message(self):
        gameUpdate = {
            'userX': self.game.userX.user_id(),
            'userO': '' if not self.game.userO else self.game.userO.user_id(),
            'winner': self.game.winner
        }
        return simplejson.dumps(gameUpdate)

    def send_update(self):
        message = self.get_game_message()
        channel.send_message(self.game.userX.user_id() + self.game.key().id_or_name(), message)
        if self.game.userO:
            channel.send_message(self.game.userO.user_id() + self.game.key().id_or_name(), message)


class GameFromRequest():
    game = None

    def __init__(self, request):
        user = users.get_current_user()
        game_key = request.get('g')
        if user and game_key:
            self.game = Game.get_by_key_name(game_key)

    def get_game(self):
        return self.game


app = webapp.WSGIApplication([
                                 ('/', MainPage),
                                 ('/opened', Opened),
                                 ('/move', Move),
                                 ('/action', Action)
                             ], debug=True)

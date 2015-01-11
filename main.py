#!/usr/bin/python
# coding=utf-8
import datetime
import json
import time
import uuid
import os

import google.appengine._internal.django.utils
from google.appengine.tools.devappserver2 import channel
import webapp2
from google.appengine.datastore import entity_pb
from google.appengine.ext import db
from google.appengine.api import users
from google.appengine.api import memcache
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from common.handlers import base #PROBLEM Z INSTALACJĄ BIBLIOTEKI




def GetLogoutUrl():
    """Returns a logout url."""
    return users.create_logout_url('/')


class StronaGlowna(webapp.RequestHandler):
    def get(self, q):
        if q is None:
            q = 'index.html'

        path = os.path.join(os.path.dirname(__file__), q)
        self.response.headers['Content-Type'] = 'text/html'
        self.response.out.write(template.render(path, {}))

        # def get(self):
        # self.response.headers['cos'] = 'text/plain'

        # ws = create_connection("ws://localhost:8080/websocket")
        # print "Sending 'Hello, World'..."
        # ws.send("Hello, World")
        #print "Sent"
        #print "Reeiving..."
        #result =  ws.recv()
        #print "Received '%s'" % result
        #ws.close()

        # temp = os.path.join(
        #     os.path.dirname(__file__),
        #     'templates/index.htm')
        # outstr = template.render(
        #     temp,
        #     {'hint': 'Good luck!'})
        # self.response.out.write(outstr)

        # indeks = "file://C:/Users/Daniel/bombermanKompetencyjny/web/dist/index.html"
        #webbrowser.open(indeks, new=new)

        # self.response.headers['Content-Type'] = 'text/plain'
        # self.response.out.write('Hello, webapp World!')
#
#
# class Game(db.Model):
#     player1 = db.StringProperty()
#     player2 = db.StringProperty()
#     moveUp = db.StringProperty()
#     moveDown = db.StringProperty()
#     moveLeft = db.StringProperty()
#     moveRight = db.StringProperty()
#     winner = db.StringProperty()
#     board = db.StringProperty()
#
#
# class GameUpdater():
#     game = None
#
#     def __init__(self, game):
#         self.game = game
#
#     def get_game_message(self):
#         gameUpdate = {
#             'board': self.game.board,
#             'player1': self.game.player1,
#             'player2': '' if not self.game.player2 else self.game.player2,
#             'moveUp': self.game.moveUp,
#             'moveDown': self.game.moveDown,
#             'moveLeft': self.game.moveLeft,
#             'moveRight': self.game.moveRight,
#             'winner': self.game.winner,
#         }
#         return google.appengine._internal.django.utils.simplejson.dumps(gameUpdate)


# def send_update(self):
#     message = self.get_game_message()
#     channel.send_message(self.game.player1 + self.game.key().id_or_name(), message)
#     if self.game.userO:
#         channel.send_message(self.game.player2 + self.game.key().id_or_name(), message)
#

class LoginHandler(webapp2.RequestHandler):
    def get(self):

        user = users.get_current_user()

        if user:
            greeting = ('Welcome, %s! (<a href="%s">sign out</a>)' %
                        (user.nickname(), users.create_logout_url('/web')))

            # przekierowywanie wszystkiego na /web a /api idzie na api
            # zrobić to przekierowanie w pliku yaml
        # #http://127.0.0.1:8080/_ah/login?continue=http%3A//127.0.0.1%3A8080/
        else:
            greeting = ('<a href="%s">Sign in or register</a>.' %
                        users.create_login_url('/'))
            self.response.out.write(users.create_login_url("http://127.0.0.1:8080/Register"))
        self.response.out.write("<html><body>%s</body></html>" % greeting)


application = webapp2.WSGIApplication([('/Login2', LoginHandler), ], debug=True)


class CheckLoginStatus(base.BaseHandler):
    """Checks the login status of a user."""

    def get(self):
        user = users.get_current_user();
        if user:
            response = {
                'loggedIn': True,
                'user': user.get_current_user(),
                'url': return users.create_login_url('/')
            }
            else:
                response = {
                    'loggedIn': False,
                    'url': GetLoginUrl()
        }
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(response))


class Memcache(webapp.RequestHandler):
    def get(self):

        self.response.headers['Content-Type'] = 'text/plain'

        m = Emp(name='Koen Bok')
        t1 = time.time()

        for i in xrange(int(self.request.get('times', 1))):
            key = uuid.uuid4().hex
            memcache.set(key, m)
            r = memcache.get(key)

        self.response.out.write('Pickle took: %.2f' % (time.time() - t1))

        t1 = time.time()

        for i in xrange(int(self.request.get('times', 1))):
            key = uuid.uuid4().hex
            memcache.set(key, db.model_to_protobuf(m).Encode())
            r = db.model_from_protobuf(entity_pb.EntityProto(memcache.get(key)))

        self.response.out.write('Proto took: %.2f' % (time.time() - t1))


class Logout(webapp.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        return users.create_logout_url('/logout')


class Register(webapp.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write('Hi, You have been registered!')


class Emp(db.Model):
    name = db.StringProperty(required=True)
    role = db.StringProperty(required=True)
    times = 10000

    def to_dict(self):
        return dict([(p, unicode(getattr(self, p))) for p in self.properties()])


class AddEmp(webapp.RequestHandler):
    def get(self):
        e = Emp(name="John",
                role="manager")

        e.put()
        self.response.out.write('Hi: ' + e.name + " " + e.role)


class Test(webapp.RequestHandler):
    def get(self, name):
        e = Emp(name=name)
        e.hire_date = datetime.datetime.now().date()
        e.put()

        self.response.out.write('Hi %s' + e.name)


class GetEmp(webapp.RequestHandler):
    def get(self):
        q = db.GqlQuery('SELECT * FROM Emp')
        result = json.dumps([p.to_dict() for p in q])

        self.response.out.write(result)


app = webapp.WSGIApplication([
                                 ('/', StronaGlowna),
                                 ('/check_login_status', CheckLoginStatus),
                                 ('/login', LoginHandler),
                                 ('/logout', Logout),
                                 ('/register', Register),
                                 ('/mem', Memcache),
                                 ('/test', Test),
                                 ('/test/<name>', Test, 'user-settings'),
                                 ('/getemp', GetEmp),
                                 ('/add', AddEmp)

                             ], debug=True)


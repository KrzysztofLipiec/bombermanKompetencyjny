# coding=utf-8
import datetime
import json
import pickle
import time
import uuid

from google.appengine.datastore import entity_pb
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.api import users
from google.appengine.api import memcache


import webapp2
from google.appengine.api import users
#
# def switch_accounts(request):
#     """ View function for allowing a user to switch Google accounts.
#         Requires 'destination_url' in the query string for the URL
#         to redirect the user to after they have switched accounts.
#     """
#     current_user_id = get_current_user().user_id()
#     previous_user_id = request.session.get('original_user_id')
#     if previous_user_id and previous_user_id != current_user_id:
#         #They have successfully switched accounts
#         del request.session['original_user_id']
#         final_destination = request.GET['destination_url']
#         return redirect(final_destination)
#     if previous_user_id and previous_user_id == current_user_id:
#         #They’ve been to the login view and returned as the same
#         #user, so they’re not using the multiple accounts feature.
#         #To switch accounts they must log out, then back in again.
#         login_url = create_login_url(dest_url=request.get_full_path())
#         return redirect(create_logout_url(dest_url=login_url)))
#         #else, we haven’t tried the multiple accounts test yet..
#         request.session['original_user_id'] = current_user_id
#         login_url = create_login_url(dest_url=request.get_full_path())
#     return redirect(login_url)


class StronaGlowna(webapp.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write('Hello, webapp World!')


class LoginHandler(webapp2.RequestHandler):
    def get(self):

        user = users.get_current_user()

        if user:
            greeting = ('Welcome, %s! (<a href="%s">sign out</a>)' %
                        (user.nickname(), users.create_logout_url('/web')))
            #przekierowywanie wszystkiego na /web a /api idzie na api
            #zrobić to przekierowanie w pliku yaml
        else:
            greeting = ('<a href="%s">Sign in or register</a>.' %
                        users.create_login_url('/'))
            self.response.out.write(users.create_login_url("http://127.0.0.1:8080/Register"))
        self.response.out.write("<html><body>%s</body></html>" % greeting)


application = webapp2.WSGIApplication([('/Login2', LoginHandler), ], debug=True)

# if user:
#     self.response.headers['Content-Type'] = 'text/plain'
#     self.response.write('Hello, ' + user.nickname())
# else:
#     self.redirect(users.create_login_url(self.request.uri))

    #self.redirect('/Register')
    #def post(self):
    #   user = self.request.get_current_user()
    #  self.redirect('/Login')


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


##UWAGI
#1. Tekst(np. href) odnośnik, do przeniesienia na stronę.


class Logout(webapp.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write('Bye, You have been log out')
        self.response.out.write(users.create_login_url("http://127.0.0.1:8080/Register"))


class Register(webapp.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write('Hi, You have been registered!')


class Emp(db.Model):
    name = db.StringProperty(required=True)
    times = 10000

    def to_dict(self):
        return dict([(p, unicode(getattr(self, p))) for p in self.properties()])


class Test(webapp.RequestHandler):
    def get(self):
        e = Emp(name=self)
        # blad w linii wyzej name=name????
        e.hire_date = datetime.datetime.now().date()
        e.put()

        self.response.out.write('Hi %s', e.name)


class GetEmp(webapp.RequestHandler):
    def get(self):
        q = db.GqlQuery('SELECT * FROM Emp')
        result = json.dumps([p.to_dict() for p in q])
        self.response.out.write(result)


# application = webapp.WSGIApplication([('/', MainPage)], debug=True)
app = webapp.WSGIApplication([
                                 ('/', StronaGlowna),
                                 ('/login', LoginHandler),
                                 ('/logout', Logout),
                                 ('/register', Register),
                                 ('/mem', Memcache),
                                 ('/test', Test),
                                 ('/test/<name>', Test, 'user-settings'),
                                 ('/getemp', GetEmp)
                                 # poczytac jak w appengine odberac parametr z linku
                             ], debug=True)


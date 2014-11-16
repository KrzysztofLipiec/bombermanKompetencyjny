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


class StronaGlowna(webapp.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write('Hello, webapp World!')


class LoginHandler(webapp.RequestHandler):
    def get(self):
        # self.response.headers['Content-Type'] = 'text/plain'
        # self.response.out.write('Hi Hey Hello Login!')
        user = users.get_current_user()
        if user:
            self.response.headers['Content-Type'] = 'text/plain'
            self.response.write('Hello, ' + user.nickname())
        else:
            self.redirect(users.create_login_url(self.request.uri))

            #self.redirect('/Register')
    #def post(self):
     #   user = self.request.get_current_user()
      #  self.redirect('/Login')


class Memcache(webapp.RequestHandler):
    def get(self):

        self.response.headers['Content-Type'] = 'text/plain'

        m = Emp(name='Koen Bok')
        t1 = time.time()
        # domyslnie bylo: t1 = time.time()

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
        self.response.out.write('Bye, You have been log out')
        # self.response.out.write(users.create_login_url("http://127.0.0.1:8080/Register"))



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
                                 ('/Login', LoginHandler),
                                 ('/Logout', Logout),
                                 ('/Register', Register),
                                 ('/mem', Memcache),
                                 ('/test/<name>', Test, 'user-settings'),
                                 ('/getemp', GetEmp)
                                 # poczytac jak w appengine odberac parametr z linku
                             ], debug=True)


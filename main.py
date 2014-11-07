import datetime
import json
from StringIO import StringIO
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.api import users


class Chuj(webapp.RequestHandler):
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

class Logout(webapp.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write(users.create_login_url("http://127.0.0.1:8080/Register"))


class Register(webapp.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write('Hi, You have been registered!')


class Emp(db.Model):
    name = db.StringProperty(required=True)

    def to_dict(self):
        return dict([(p, unicode(getattr(self, p))) for p in self.properties()])

class Test(webapp.RequestHandler):
    def get(self):
        e = Emp(name=name)

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
    ('/', Chuj),
    ('/main', LoginHandler),
    ('/Logout', Logout),
    ('/Register', Register),
    ('/test/<name>', Test, 'user-settings'),
    ('/getemp', GetEmp)
#poczytac jak w appengine odberac parametr z linku
], debug=True)


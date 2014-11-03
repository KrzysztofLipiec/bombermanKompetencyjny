from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.api import users

class MainPage(webapp.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write('Hello, webapp World!')

class LoginHandler(webapp.RequestHandler):
    def get(self):
       # self.response.headers['Content-Type'] = 'text/plain'
      #  self.response.out.write('Hi Hey Hello Login!')
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



# application = webapp.WSGIApplication([('/', MainPage)], debug=True)
app = webapp.WSGIApplication([
    ('/', MainPage),
    ('/main', LoginHandler),
    ('/Logout', Logout),
    ('/Register', Register)
], debug=True)


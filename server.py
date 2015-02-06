import tornado.ioloop
import tornado.web
import tornado.websocket

clients = []


class IndexHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    def get(request):
        request.render("index.html")


class WebSocketChatHandler(tornado.websocket.WebSocketHandler):

    def open(self, *args):
        print("open", "WebSocketChatHandler")
        clients.append(self)

    def on_message(self, message):
        print message
        for client in clients:
            if not self == client:
                client.write_message(message)

    def on_close(self):
        clients.remove(self)


application = tornado.web.Application([
    (r"/", IndexHandler),
    (r"/game", WebSocketChatHandler)
])

if __name__ == "__main__":
    application.listen(9876)
    tornado.ioloop.IOLoop.instance().start()

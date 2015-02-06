var channelController;

channelController = (function() {
  function channelController(promise) {
    var channel, self, socket;
    this.promise = promise;
    self = this;
    channel = new goog.appengine.Channel(window.token);
    socket = channel.open();
    socket.onopen = self.onOpened;
    socket.onmessage = self.onMessage.bind(this);
    socket.onerror = self.onError;
    socket.onclose = self.onClose;
    this.opened = false;
  }

  channelController.prototype.update = function() {
    var display, result;
    result = "game";
    display = {
      "#displayGame": "block",
      "#displayWaiting": "none"
    };
    if (!window.userO || window.userO === "") {
      result = "waiting";
      display["#displayGame"] = "none";
      display["#displayWaiting"] = "block";
    }
    $.each(display, function(label) {
      return $(label).css("display", display[label]);
    });
    if (result === "game" && !this.opened) {
      this.opened = true;
      this.websocket = new WebSocket("ws://localhost:9876/game");
      this.websocket.onopen = function(evt) {
        return console.log("opened");
      };
      this.websocket.onmessage = function(evt) {
        var data;
        data = JSON.parse(evt.data);
        if (data.action === "getBonus") {
          console.log("getBonus");
          switch (data.options.bonus) {
            case 'life':
              console.log("life");
              basicScene.enemy.lifes++;
              gui.changeLifes(basicScene.enemy);
              break;
            case 'range':
              console.log("range");
              basicScene.enemy.bombRange++;
              gui.changeBombRange(basicScene.enemy);
              break;
            case 'bomb':
              console.log("bomb");
              basicScene.enemy.bombCount++;
              gui.changeBombCount(basicScene.enemy);
              break;
            default:
              console.log("bonus error");
          }
        }
        if (data.action === "placeBomb") {
          basicScene.placeBomb(basicScene.enemy);
        }
        if (data.action === "move") {
          switch (data.direction) {
            case 'right':
              return basicScene.moveRight(basicScene.enemy);
            case 'left':
              return basicScene.moveLeft(basicScene.enemy);
            case 'up':
              return basicScene.moveUp(basicScene.enemy);
            case 'down':
              return basicScene.moveDown(basicScene.enemy);
            default:
              return console.log("move error");
          }
        }
      };
      return this.promise.resolve();
    } else {
      return setTimeout(this.update.bind(this), 60 / 1000);
    }
  };

  channelController.prototype.onOpened = function() {
    var sendMessage;
    sendMessage = function(path, opt_param) {
      var xhr;
      path += '?g=' + window.game_key;
      if (opt_param) {
        path += '&' + opt_param;
      }
      xhr = new XMLHttpRequest();
      xhr.open('POST', path, true);
      return xhr.send();
    };
    return sendMessage("/opened");
  };

  channelController.prototype.onMessage = function(m) {
    var newState;
    newState = JSON.parse(m.data);
    window.userX = newState.userX || window.userX;
    window.userO = newState.userO || window.userO;
    window.winner = newState.winner || window.winner;
    return this.update();
  };

  channelController.prototype.onClose = function() {};

  channelController.prototype.onError = function() {};

  return channelController;

})();

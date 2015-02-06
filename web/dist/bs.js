var BS,
  __modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

BS = (function() {
  function BS(gui, controller) {
    var enPos, myPos;
    this.controller = controller;
    if (window.innerWidth >= window.innerHeight) {
      this.sizex = window.innerHeight - (window.innerHeight / 15);
      this.sizey = window.innerHeight - (window.innerHeight / 15);
    } else {
      this.sizex = window.innerWidth - (window.innerWidth / 15);
      this.sizey = window.innerWidth - (window.innerWidth / 15);
    }
    this.scale = this.sizex / 15 / 50;
    this.stage = new PIXI.Stage(0x66FF99);
    this.renderer = PIXI.autoDetectRenderer(this.sizex, this.sizey);
    $("#game").append(this.renderer.view);
    this.makeWorld();
    myPos = {};
    enPos = {};
    if (window.mySign === "X") {
      myPos = {
        x: 0,
        y: 0
      };
      enPos = {
        x: 14,
        y: 14
      };
    } else {
      myPos = {
        x: 14,
        y: 14
      };
      enPos = {
        x: 0,
        y: 0
      };
    }
    this.me = new Player(this.scale, myPos.x, myPos.y, 'me');
    this.enemy = new Player(this.scale, enPos.x, enPos.y, 'enemy');
    this.stage.addChild(this.me.sprite);
    this.stage.addChild(this.enemy.sprite);
    this.gui = gui;
  }

  BS.prototype.makeWorld = function() {
    var i, j, _i, _ref, _results;
    this.tab = [[0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0], [0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    this.obstacles = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    this.bombsTab = [];
    _results = [];
    for (j = _i = 0, _ref = this.tab.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; j = 0 <= _ref ? ++_i : --_i) {
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (i = _j = 0, _ref1 = this.tab.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          switch (this.tab[i][j]) {
            case 0:
              this.tab[i][j] = new Grass(i, j, this.scale);
              _results1.push(this.stage.addChild(this.tab[i][j].sprite));
              break;
            case 1:
              this.tab[i][j] = new Stone(i, j, this.scale);
              _results1.push(this.stage.addChild(this.tab[i][j].sprite));
              break;
            case 2:
              this.tab[i][j] = new Destro(i, j, this.scale);
              _results1.push(this.stage.addChild(this.tab[i][j].sprite));
              break;
            default:
              _results1.push(void 0);
          }
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  BS.prototype.frame = function() {
    this.renderer.render(this.stage);
    this.me.update();
    this.enemy.update();
    return setTimeout(this.frame.bind(this), 60 / 1000);
  };

  BS.prototype.checkObstacle = function(x, y, player) {
    if (this.obstacles[x][y].bonus && player.name !== "enemy") {
      switch (this.obstacles[x][y].bonus) {
        case "hearth":
          this.stage.removeChild(this.obstacles[x][y].sprite);
          player.lifes++;
          this.sendActionMessage("getBonus", {
            bonus: "life"
          });
          gui.changeLifes(player);
          return this.obstacles[x][y] = 0;
        case "bombCount":
          this.stage.removeChild(this.obstacles[x][y].sprite);
          player.bombCount++;
          this.sendActionMessage("getBonus", {
            bonus: "bomb"
          });
          gui.changeBombCount(player);
          return this.obstacles[x][y] = 0;
        case "bombRange":
          this.stage.removeChild(this.obstacles[x][y].sprite);
          player.bombRange++;
          this.sendActionMessage("getBonus", {
            bonus: "range"
          });
          gui.changeBombRange(player);
          return this.obstacles[x][y] = 0;
      }
    }
  };

  BS.prototype.makeMoveable = function(x, y) {
    return basicScene.tab[x][y].moveable = true;
  };

  BS.prototype.sendActionMessage = function(action, options) {
    var data;
    data = {
      "action": action,
      "options": options
    };
    return chanel.websocket.send(JSON.stringify(data));
  };

  BS.prototype.sendMoveMessage = function(dir) {
    var data;
    data = {
      "action": "move",
      "direction": dir
    };
    return chanel.websocket.send(JSON.stringify(data));
  };

  BS.prototype.moveLeft = function(player) {
    if (player.position.x >= 1 && typeof this.tab[player.position.x - 1][player.position.y] !== 'undefined') {
      if (this.tab[player.position.x - 1][player.position.y].moveable && this.tab[player.position.x - 1][player.position.y].bomb === false) {
        this.tab[player.position.x][player.position.y].moveable = false;
        this.tab[player.position.x - 1][player.position.y].moveable = false;
        TweenLite.to(player.position, player.speed, {
          x: player.position.x - 1,
          ease: Linear.easeNone,
          onComplete: this.makeMoveable,
          onCompleteParams: [player.position.x, player.position.y]
        });
        player.sprite.setTexture(PIXI.Texture.fromImage('images/left.png'));
        return this.checkObstacle(player.position.x - 1, player.position.y, player);
      }
    }
  };

  BS.prototype.moveRight = function(player) {
    if (player.position.x < 14 && typeof this.tab[player.position.x + 1][player.position.y] !== 'undefined') {
      if (this.tab[player.position.x + 1][player.position.y].moveable && this.tab[player.position.x + 1][player.position.y].bomb === false) {
        this.tab[player.position.x][player.position.y].moveable = false;
        this.tab[player.position.x + 1][player.position.y].moveable = false;
        TweenLite.to(player.position, player.speed, {
          x: player.position.x + 1,
          ease: Linear.easeNone,
          onComplete: this.makeMoveable,
          onCompleteParams: [player.position.x, player.position.y]
        });
        player.sprite.setTexture(PIXI.Texture.fromImage('images/right.png'));
        return this.checkObstacle(player.position.x + 1, player.position.y, player);
      }
    }
  };

  BS.prototype.moveUp = function(player) {
    if (player.position.y >= 1 && typeof this.tab[player.position.x][player.position.y - 1] !== 'undefined') {
      if (this.tab[player.position.x][player.position.y - 1].moveable && this.tab[player.position.x][player.position.y - 1].bomb === false) {
        this.tab[player.position.x][player.position.y].moveable = false;
        this.tab[player.position.x][player.position.y - 1].moveable = false;
        TweenLite.to(player.position, player.speed, {
          y: player.position.y - 1,
          ease: Linear.easeNone,
          onComplete: this.makeMoveable,
          onCompleteParams: [player.position.x, player.position.y]
        });
        player.sprite.setTexture(PIXI.Texture.fromImage('images/up.png'));
        return this.checkObstacle(player.position.x, player.position.y - 1, player);
      }
    }
  };

  BS.prototype.moveDown = function(player) {
    if (player.position.y < 14 && typeof this.tab[player.position.x] !== 'undefined') {
      if (this.tab[player.position.x][player.position.y + 1].moveable && this.tab[player.position.x][player.position.y + 1].bomb === false) {
        this.tab[player.position.x][player.position.y].moveable = false;
        this.tab[player.position.x][player.position.y + 1].moveable = false;
        TweenLite.to(player.position, player.speed, {
          y: player.position.y + 1,
          ease: Linear.easeNone,
          onComplete: this.makeMoveable,
          onCompleteParams: [player.position.x, player.position.y]
        });
        player.sprite.setTexture(PIXI.Texture.fromImage('images/down.png'));
        return this.checkObstacle(player.position.x, player.position.y + 1, player);
      }
    }
  };

  BS.prototype.placeBomb = function(player) {
    var pozx, pozy;
    if (player.bombCount > 0 && typeof this.obstacles[player.position.x] !== 'undefined') {
      if (this.obstacles[player.position.x][player.position.y] === 0) {
        this.obstacles[player.position.x][player.position.y] = new Bomb(player.position.x, player.position.y, this.scale);
        this.bombsTab.push(this.obstacles[player.position.x][player.position.y]);
        pozx = this.obstacles[player.position.x][player.position.y].posX;
        pozy = this.obstacles[player.position.x][player.position.y].posY;
        this.stage.addChild(this.obstacles[player.position.x][player.position.y].sprite);
        this.tab[player.position.x][player.position.y].bomb = true;
        --player.bombCount;
        gui.changeBombCount(player);
        return setTimeout(function() {
          return basicScene.obstacles[pozx][pozy].explode(pozx, pozy, player);
        }, 3000);
      }
    }
  };

  BS.prototype.keyDownTextField = function(e) {
    var keyCode;
    keyCode = e.keyCode;
    if (__modulo(this.me.position.x, 1) === 0 && __modulo(this.me.position.y, 1) === 0) {
      switch (keyCode) {
        case 37:
          this.sendMoveMessage("left");
          return this.moveLeft(this.me);
        case 65:
          this.sendMoveMessage("left");
          return this.moveLeft(this.me);
        case 39:
          this.sendMoveMessage("right");
          return this.moveRight(this.me);
        case 68:
          this.sendMoveMessage("right");
          return this.moveRight(this.me);
        case 38:
          this.sendMoveMessage("up");
          return this.moveUp(this.me);
        case 87:
          this.sendMoveMessage("up");
          return this.moveUp(this.me);
        case 40:
          this.sendMoveMessage("down");
          return this.moveDown(this.me);
        case 83:
          this.sendMoveMessage("down");
          return this.moveDown(this.me);
        case 32:
          this.sendActionMessage("placeBomb");
          return this.placeBomb(basicScene.me);
      }
    }
  };

  return BS;

})();

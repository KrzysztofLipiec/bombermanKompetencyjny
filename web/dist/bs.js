var BS,
  __modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

BS = (function() {
  function BS(gui) {
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
    document.body.appendChild(this.renderer.view);
    this.makeWorld();
    this.me = new Player(this.scale, 0, 0, 'me');
    this.stage.addChild(this.me.sprite);
    this.enemy = new Player(this.scale, 14, 14, 'enemy');
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

  BS.prototype.enemyRandom = function() {
    var rand;
    setTimeout(this.enemyRandom.bind(this), 1000);
    rand = Math.floor(Math.random() * 5);
    switch (rand) {
      case 0:
        return this.moveLeft(this.enemy);
      case 1:
        return this.moveRight(this.enemy);
      case 2:
        return this.moveUp(this.enemy);
      case 3:
        return this.moveDown(this.enemy);
      case 4:
        return this.placeBomb(this.enemy);
    }
  };

  BS.prototype.frame = function() {
    setTimeout(this.frame.bind(this), 60 / 1000);
    this.renderer.render(this.stage);
    this.me.update();
    return this.enemy.update();
  };

  BS.prototype.checkObstacle = function(x, y, player) {
    if (this.obstacles[x][y].bonus) {
      switch (this.obstacles[x][y].bonus) {
        case "hearth":
          this.stage.removeChild(this.obstacles[x][y].sprite);
          player.lifes++;
          gui.changeLifes(player);
          return this.obstacles[x][y] = 0;
        case "bombCount":
          this.stage.removeChild(this.obstacles[x][y].sprite);
          player.bombCount++;
          gui.changeBombCount(player);
          return this.obstacles[x][y] = 0;
        case "bombRange":
          this.stage.removeChild(this.obstacles[x][y].sprite);
          player.bombRange++;
          gui.changeBombRange(player);
          return this.obstacles[x][y] = 0;
      }
    }
  };

  BS.prototype.makeMoveable = function(x, y) {
    return basicScene.tab[x][y].moveable = true;
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
          return this.moveLeft(this.me);
        case 65:
          return this.moveLeft(this.me);
        case 39:
          return this.moveRight(this.me);
        case 68:
          return this.moveRight(this.me);
        case 38:
          return this.moveUp(this.me);
        case 87:
          return this.moveUp(this.me);
        case 40:
          return this.moveDown(this.me);
        case 83:
          return this.moveDown(this.me);
        case 32:
          return this.placeBomb(basicScene.me);
      }
    }
  };

  return BS;

})();

var BS,
  __modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

BS = (function() {
  function BS() {
    if (window.innerWidth >= window.innerHeight) {
      this.sizex = window.innerHeight;
      this.sizey = window.innerHeight;
    } else {
      this.sizex = window.innerWidth;
      this.sizey = window.innerWidth;
    }
    this.scale = this.sizex / 15 / 50;
    this.stage = new PIXI.Stage(0x66FF99);
    this.renderer = PIXI.autoDetectRenderer(this.sizex, this.sizey);
    document.body.appendChild(this.renderer.view);
    this.makeWorld();
    this.p1 = new Player(this.scale);
    this.stage.addChild(this.p1.sprite);
    this.p1.scale = this.scale;
  }

  BS.prototype.makeWorld = function() {
    var i, j, _i, _ref, _results;
    this.tab = [[0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    this.obstacles = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
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
    setTimeout(this.frame.bind(this), 60 / 1000);
    this.renderer.render(this.stage);
    return this.p1.update();
  };

  BS.prototype.keyDownTextField = function(e) {
    var keyCode, pozx, pozy;
    keyCode = e.keyCode;
    if (__modulo(this.p1.position.x, 1) === 0 && __modulo(this.p1.position.y, 1) === 0) {
      switch (keyCode) {
        case 37 || 65:
          if (this.p1.position.x >= 1) {
            if (this.tab[this.p1.position.x - 1][this.p1.position.y].moveable === true) {
              TweenLite.to(this.p1.position, this.p1.speed, {
                x: this.p1.position.x - 1,
                ease: Linear.easeNone
              });
              return this.p1.sprite.setTexture(PIXI.Texture.fromImage('images/left.png'));
            }
          }
          break;
        case 39 || 68:
          if (this.p1.position.x < 14) {
            if (this.tab[this.p1.position.x + 1][this.p1.position.y].moveable === true) {
              TweenLite.to(this.p1.position, this.p1.speed, {
                x: this.p1.position.x + 1,
                ease: Linear.easeNone
              });
              return this.p1.sprite.setTexture(PIXI.Texture.fromImage('images/right.png'));
            }
          }
          break;
        case 38 || 87:
          if (this.p1.position.y >= 1) {
            if (this.tab[this.p1.position.x][this.p1.position.y - 1].moveable === true) {
              TweenLite.to(this.p1.position, this.p1.speed, {
                y: this.p1.position.y - 1,
                ease: Linear.easeNone
              });
              return this.p1.sprite.setTexture(PIXI.Texture.fromImage('images/up.png'));
            }
          }
          break;
        case 40 || 83:
          if (this.p1.position.y < 14) {
            if (this.tab[this.p1.position.x][this.p1.position.y + 1].moveable === true) {
              TweenLite.to(this.p1.position, this.p1.speed, {
                y: this.p1.position.y + 1,
                ease: Linear.easeNone
              });
              return this.p1.sprite.setTexture(PIXI.Texture.fromImage('images/down.png'));
            }
          }
          break;
        case 32:
          if (this.p1.bombCount > 0) {
            this.obstacles[this.p1.position.x][this.p1.position.y] = new Bomb(this.p1.position.x, this.p1.position.y, this.scale);
            pozx = this.obstacles[this.p1.position.x][this.p1.position.y].posX;
            pozy = this.obstacles[this.p1.position.x][this.p1.position.y].posY;
            this.stage.addChild(this.obstacles[this.p1.position.x][this.p1.position.y].sprite);
            this.tab[this.p1.position.x][this.p1.position.y].moveable = false;
            this.p1.bombCount--;
            return setTimeout(function() {
              return basicScene.obstacles[pozx][pozy].explode(pozx, pozy);
            }, 3000);
          }
      }
    }
  };

  return BS;

})();

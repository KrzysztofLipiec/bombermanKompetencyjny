var Bomb;

Bomb = (function() {
  var afterExplode;

  function Bomb(x, y, scale) {
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/bomb.png'));
    this.sprite.position.x = x * 50 * scale;
    this.sprite.position.y = y * 50 * scale;
    this.sprite.scale.x = this.sprite.scale.y = scale;
    this.posX = x;
    this.posY = y;
    this.bombTab = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  }

  Bomb.prototype.makeFlame = function(direction) {};

  Bomb.prototype.exp = function(x, y) {
    basicScene.obstacles[x][y].sprite.setTexture(PIXI.Texture.fromImage('images/explosion.png'));
    basicScene.tab[x][y].moveable = true;
    basicScene.p1.bombCount++;
    return this.makeFlame();
  };

  Bomb.prototype.explode = function(x, y) {
    var breakloop, i, px, py, _i, _j, _k, _l, _ref, _ref1, _ref2, _ref3;
    basicScene.obstacles[x][y].sprite.setTexture(PIXI.Texture.fromImage('images/explosion.png'));
    basicScene.tab[x][y].moveable = true;
    basicScene.p1.bombCount++;
    breakloop = false;
    setTimeout(function() {
      return basicScene.stage.removeChild(basicScene.obstacles[x][y].sprite);
    }, 1500);
    for (i = _i = 1, _ref = basicScene.p1.bombRange; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
      if (x < 14 && typeof basicScene.tab[x + i] !== 'undefined') {
        if (basicScene.tab[x + i][y].stone === false) {
          this.createFlame(x + i, y, basicScene.scale, 1);
          basicScene.stage.addChild(this.bombTab[x + i][y]);
          px = x + i;
          (function(px, y, bombTab) {
            this.bombTab = bombTab;
            return setTimeout(function() {
              return basicScene.stage.removeChild(this.bombTab[px][y]);
            }, 1500);
          })(px, y, this.bombTab);
          if (basicScene.tab[x + i][y].destructable === true) {
            afterExplode(x + i, y);
            breakloop = true;
          }
        } else {
          breakloop = true;
        }
      }
      if (breakloop) {
        break;
      }
    }
    breakloop = false;
    for (i = _j = 1, _ref1 = basicScene.p1.bombRange; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
      if (x >= 1 && typeof basicScene.tab[x - i] !== 'undefined') {
        if (basicScene.tab[x - i][y].stone === false) {
          this.createFlame(x - i, y, basicScene.scale, 1);
          basicScene.stage.addChild(this.bombTab[x - i][y]);
          px = x - i;
          (function(px, y, bombTab) {
            this.bombTab = bombTab;
            return setTimeout(function() {
              return basicScene.stage.removeChild(this.bombTab[px][y]);
            }, 1500);
          })(px, y, this.bombTab);
          if (basicScene.tab[x - i][y].destructable === true) {
            afterExplode(x - i, y);
            breakloop = true;
          }
        } else {
          breakloop = true;
        }
      }
      if (breakloop) {
        break;
      }
    }
    breakloop = false;
    for (i = _k = 1, _ref2 = basicScene.p1.bombRange; 1 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 1 <= _ref2 ? ++_k : --_k) {
      if (y < 14 && typeof basicScene.tab[x][y + i] !== 'undefined') {
        if (basicScene.tab[x][y + i].stone === false) {
          this.createFlame(x, y + i, basicScene.scale, 2);
          basicScene.stage.addChild(this.bombTab[x][y + i]);
          py = y + i;
          (function(x, py, bombTab) {
            this.bombTab = bombTab;
            return setTimeout(function() {
              return basicScene.stage.removeChild(this.bombTab[x][py]);
            }, 1500);
          })(x, py, this.bombTab);
          if (basicScene.tab[x][y + i].destructable === true) {
            afterExplode(x, y + i);
            breakloop = true;
          }
        } else {
          breakloop = true;
        }
      }
      if (breakloop) {
        break;
      }
    }
    breakloop = false;
    for (i = _l = 1, _ref3 = basicScene.p1.bombRange; 1 <= _ref3 ? _l <= _ref3 : _l >= _ref3; i = 1 <= _ref3 ? ++_l : --_l) {
      if (y >= 1 && typeof basicScene.tab[x][y - i] !== 'undefined') {
        if (basicScene.tab[x][y - i].stone === false) {
          this.createFlame(x, y - i, basicScene.scale, 2);
          basicScene.stage.addChild(this.bombTab[x][y - i]);
          py = y - i;
          (function(py, bombTab, x) {
            this.bombTab = bombTab;
            return setTimeout(function() {
              return basicScene.stage.removeChild(this.bombTab[x][py]);
            }, 1500);
          })(py, this.bombTab, x);
          if (basicScene.tab[x][y - i].destructable === true) {
            afterExplode(x, y - i);
            breakloop = true;
          }
        } else {
          breakloop = true;
        }
      }
      if (breakloop) {
        break;
      }
    }
    return breakloop = false;
  };

  Bomb.prototype.createFlame = function(x, y, scale, direction) {
    if (direction === 1) {
      this.bombTab[x][y] = new PIXI.Sprite(PIXI.Texture.fromImage('images/exp_hor.jpg'));
    }
    if (direction === 2) {
      this.bombTab[x][y] = new PIXI.Sprite(PIXI.Texture.fromImage('images/exp_vert.jpg'));
    }
    this.bombTab[x][y].position.x = x * 50 * scale;
    this.bombTab[x][y].position.y = y * 50 * scale;
    return this.bombTab[x][y].scale.x = this.bombTab[x][y].scale.y = scale;
  };

  afterExplode = function(x, y) {
    basicScene.tab[x][y].sprite.setTexture(PIXI.Texture.fromImage('images/white.jpg'));
    return basicScene.tab[x][y].moveable = true;
  };

  return Bomb;

})();

var Bomb;

Bomb = (function() {
  function Bomb(x, y, scale, id) {
    this.bomb = true;
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/bomb.png'));
    this.sprite.position.x = x * 50 * scale;
    this.sprite.position.y = y * 50 * scale;
    this.sprite.scale.x = this.sprite.scale.y = scale;
    this.posX = x;
    this.posY = y;
    this.flameTab = [];
    this.exploded = false;
    this.id = id;
  }

  Bomb.prototype.createFlame = function(orientation, player, x, y) {
    var bottom, i, left, right, top, _i, _j, _ref, _ref1, _results, _results1;
    switch (orientation) {
      case "vertical":
        top = true;
        bottom = true;
        _results = [];
        for (i = _i = 1, _ref = player.bombRange; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          if (top) {
            if (y < 14 && typeof basicScene.tab[y + i] !== 'undefined') {
              if (basicScene.obstacles[x][y + i].bomb) {
                top = false;
                if (basicScene.obstacles[x][y + i].exploded === false) {
                  this.exp(x, y + i, player);
                }
              }
              if (basicScene.tab[x][y + i].stone === false) {
                this.flameTab.push(new Explosion(x, y + i, basicScene.scale, 2));
                if (basicScene.tab[x][y + i].destructable === true) {
                  this.afterExplode(x, y + i);
                  top = false;
                }
              } else {
                top = false;
              }
            }
          }
          if (bottom) {
            if (y >= 1 && typeof basicScene.tab[y - i] !== 'undefined') {
              if (basicScene.obstacles[x][y - i].bomb === true) {
                bottom = false;
                if (basicScene.obstacles[x][y - i].exploded === false) {
                  this.exp(x, y - i, player);
                }
              }
              if (basicScene.tab[x][y - i].stone === false) {
                this.flameTab.push(new Explosion(x, y - i, basicScene.scale, 2));
                if (basicScene.tab[x][y - i].destructable === true) {
                  this.afterExplode(x, y - i);
                  _results.push(bottom = false);
                } else {
                  _results.push(void 0);
                }
              } else {
                _results.push(bottom = false);
              }
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
        break;
      case "horizontal":
        right = true;
        left = true;
        _results1 = [];
        for (i = _j = 1, _ref1 = player.bombRange; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
          if (right) {
            if (x < 14 && typeof basicScene.tab[x + i] !== 'undefined') {
              if (basicScene.obstacles[x + i][y].bomb) {
                right = false;
                if (basicScene.obstacles[x + i][y].exploded === false) {
                  this.exp(x + i, y, player);
                }
              }
              if (basicScene.tab[x + i][y].stone === false) {
                this.flameTab.push(new Explosion(x + i, y, basicScene.scale, 1));
                if (basicScene.tab[x + i][y].destructable === true) {
                  this.afterExplode(x + i, y);
                  right = false;
                }
              } else {
                right = false;
              }
            }
          }
          if (left) {
            if (x >= 1 && typeof basicScene.tab[x - i] !== 'undefined') {
              if (basicScene.obstacles[x - i][y].bomb) {
                left = false;
                if (basicScene.obstacles[x - i][y].exploded === false) {
                  this.exp(x - i, y, player);
                }
              }
              if (basicScene.tab[x - i][y].stone === false) {
                this.flameTab.push(new Explosion(x - i, y, basicScene.scale, 1));
                if (basicScene.tab[x - i][y].destructable === true) {
                  this.afterExplode(x - i, y);
                  _results1.push(left = false);
                } else {
                  _results1.push(void 0);
                }
              } else {
                _results1.push(left = false);
              }
            } else {
              _results1.push(void 0);
            }
          } else {
            _results1.push(void 0);
          }
        }
        return _results1;
    }
  };

  Bomb.prototype.explode = function(x, y, player) {
    if (this.exploded !== true) {
      return this.exp(x, y, player);
    }
  };

  Bomb.prototype.clearFlame = function(x, y) {
    var i, _i, _ref;
    for (i = _i = 0, _ref = this.flameTab.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      basicScene.stage.removeChild(this.flameTab[i].sprite);
    }
    basicScene.stage.removeChild(basicScene.obstacles[x][y].sprite);
    basicScene.obstacles[x][y] = 0;
    return basicScene.bombsTab.shift();
  };

  Bomb.prototype.exp = function(x, y, player) {
    var i, _i, _ref;
    basicScene.obstacles[x][y].exploded = true;
    basicScene.obstacles[x][y].sprite.setTexture(PIXI.Texture.fromImage('images/explosion.png'));
    basicScene.tab[x][y].bomb = false;
    player.bombCount++;
    basicScene.gui.changeBombCount(player);
    this.createFlame("horizontal", player, x, y);
    this.createFlame("vertical", player, x, y);
    for (i = _i = 0, _ref = this.flameTab.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      basicScene.stage.addChild(this.flameTab[i].sprite);
    }
    return setTimeout(this.clearFlame.bind(this), 1500, x, y);
  };

  Bomb.prototype.afterExplode = function(x, y) {
    var rand;
    rand = Math.floor(Math.random() * 5);
    basicScene.tab[x][y] = new Grass(x, y, basicScene.scale);
    basicScene.stage.addChild(basicScene.tab[x][y].sprite);
    basicScene.obstacles[x][y] = 0;
    switch (rand) {
      case 0:
        basicScene.obstacles[x][y] = new Bonus(x, y, basicScene.scale, "hearth");
        return basicScene.stage.addChild(basicScene.obstacles[x][y].sprite);
      case 1:
        basicScene.obstacles[x][y] = new Bonus(x, y, basicScene.scale, "bombCount");
        return basicScene.stage.addChild(basicScene.obstacles[x][y].sprite);
      case 2:
        basicScene.obstacles[x][y] = new Bonus(x, y, basicScene.scale, "bombRange");
        return basicScene.stage.addChild(basicScene.obstacles[x][y].sprite);
    }
  };

  return Bomb;

})();

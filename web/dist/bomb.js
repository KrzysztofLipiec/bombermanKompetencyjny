var Bomb;

Bomb = (function() {
  function Bomb(x, y, scale) {
    this.bomb = true;
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/bomb.png'));
    this.sprite.position.x = x * 50 * scale;
    this.sprite.position.y = y * 50 * scale;
    this.sprite.scale.x = this.sprite.scale.y = scale;
    this.posX = x;
    this.posY = y;
    this.flameTab = [];
    this.exploded = true;
  }

  Bomb.prototype.createFlame = function(orientation) {
    var bottom, i, left, right, top, _i, _j, _ref, _ref1, _results, _results1;
    switch (orientation) {
      case "vertical":
        top = true;
        bottom = true;
        _results = [];
        for (i = _i = 1, _ref = basicScene.p1.bombRange; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          if (top) {
            if (this.posY < 14 && typeof basicScene.tab[this.posY + i] !== 'undefined') {
              if (basicScene.obstacles[this.posX][this.posY + i].exploded) {
                top = false;
              }
              if (basicScene.tab[this.posX][this.posY + i].stone === false) {
                this.flameTab.push(new Explosion(this.posX, this.posY + i, basicScene.scale, 2));
                if (basicScene.tab[this.posX][this.posY + i].destructable === true) {
                  this.afterExplode(this.posX, this.posY + i);
                  top = false;
                }
              } else {
                top = false;
              }
            }
          }
          if (bottom) {
            if (this.posY >= 1 && typeof basicScene.tab[this.posY - i] !== 'undefined') {
              if (basicScene.obstacles[this.posX][this.posY - i].exploded) {
                bottom = false;
              }
              if (basicScene.tab[this.posX][this.posY - i].stone === false) {
                this.flameTab.push(new Explosion(this.posX, this.posY - i, basicScene.scale, 2));
                if (basicScene.tab[this.posX][this.posY - i].destructable === true) {
                  this.afterExplode(this.posX, this.posY - i);
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
        for (i = _j = 1, _ref1 = basicScene.p1.bombRange; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
          if (right) {
            if (this.posX < 14 && typeof basicScene.tab[this.posX + i] !== 'undefined') {
              if (basicScene.obstacles[this.posX + i][this.posY].bomb) {
                right = false;
              }
              if (basicScene.tab[this.posX + i][this.posY].stone === false) {
                this.flameTab.push(new Explosion(this.posX + i, this.posY, basicScene.scale, 1));
                if (basicScene.tab[this.posX + i][this.posY].destructable === true) {
                  this.afterExplode(this.posX + i, this.posY);
                  right = false;
                }
              } else {
                right = false;
              }
            }
          }
          if (left) {
            if (this.posX >= 1 && typeof basicScene.tab[this.posX - i] !== 'undefined') {
              if (basicScene.obstacles[this.posX - i][this.posY].bomb) {
                left = false;
              }
              if (basicScene.tab[this.posX - i][this.posY].stone === false) {
                this.flameTab.push(new Explosion(this.posX - i, this.posY, basicScene.scale, 1));
                if (basicScene.tab[this.posX - i][this.posY].destructable === true) {
                  this.afterExplode(this.posX - i, this.posY);
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

  Bomb.prototype.clearFlame = function() {
    var i, _i, _ref;
    for (i = _i = 0, _ref = this.flameTab.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      basicScene.stage.removeChild(this.flameTab[i].sprite);
      basicScene.stage.removeChild(basicScene.obstacles[this.posX][this.posY].sprite);
    }
    return basicScene.bombsTab.shift();
  };

  Bomb.prototype.exp = function(x, y) {
    var i, _i, _ref;
    this.exploded = false;
    basicScene.obstacles[x][y].sprite.setTexture(PIXI.Texture.fromImage('images/explosion.png'));
    basicScene.tab[x][y].moveable = true;
    basicScene.p1.bombCount++;
    this.createFlame("vertical");
    this.createFlame("horizontal");
    for (i = _i = 0, _ref = this.flameTab.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      basicScene.stage.addChild(this.flameTab[i].sprite);
    }
    return setTimeout(this.clearFlame.bind(this), 1500);
  };

  Bomb.prototype.afterExplode = function(x, y) {
    var rand;
    rand = Math.floor(Math.random() * 3);
    console.log(rand);
    basicScene.tab[x][y] = new Grass(x, y, basicScene.scale);
    basicScene.stage.addChild(basicScene.tab[x][y].sprite);
    switch (rand) {
      case 0:
        basicScene.obstacles[x][y] = new Bonus(x, y, basicScene.scale, "hearth");
        return basicScene.stage.addChild(basicScene.obstacles[x][y].sprite);
      case 1:
        basicScene.obstacles[x][y] = new Bonus(x, y, basicScene.scale, "bombPlus");
        return basicScene.stage.addChild(basicScene.obstacles[x][y].sprite);
    }
  };

  return Bomb;

})();

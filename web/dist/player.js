var Player;

Player = (function() {
  function Player(s, x, y) {
    this.position = {
      x: x,
      y: y
    };
    this.speed = 0.3;
    this.scale = s;
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/right.png'));
    this.sprite.scale.x = this.sprite.scale.y = this.scale;
    this.bombCount = 3;
    this.bombRange = 3;
    this.lifes = 3;
  }

  Player.prototype.update = function() {
    var parent;
    this.sprite.position.x = this.position.x * 50 * this.scale;
    this.sprite.position.y = this.position.y * 50 * this.scale;
    if (this.sprite.parent) {
      parent = this.sprite.parent;
      parent.removeChild(this.sprite);
      parent.addChild(this.sprite);
    }
    return this.checkFlame();
  };

  Player.prototype.reset = function() {
    if (this.lifes === 0) {
      alert("Brak zyc");
    }
    this.position.x = 0;
    return this.position.y = 0;
  };

  Player.prototype.checkFlame = function() {
    var i, j, _i, _ref, _results;
    if (basicScene.bombsTab.length > 0) {
      _results = [];
      for (i = _i = 0, _ref = basicScene.bombsTab.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (basicScene.bombsTab[i].flameTab.length > 0) {
          _results.push((function() {
            var _j, _ref1, _results1;
            _results1 = [];
            for (j = _j = 0, _ref1 = basicScene.bombsTab[i].flameTab.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
              if ((basicScene.bombsTab[i].flameTab[j].x === this.position.x || basicScene.bombsTab[i].posX === this.position.x) && (basicScene.bombsTab[i].flameTab[j].y === this.position.y || basicScene.bombsTab[i].posY === this.position.y)) {
                this.position.x = -1;
                this.position.y = -1;
                alert("Straciles zycie");
                setTimeout(this.reset.bind(this), 1500);
                _results1.push(this.lifes--);
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          }).call(this));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  return Player;

})();

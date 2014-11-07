var BS;

BS = (function() {
  function BS() {
    if (window.innerWidth >= window.innerHeight) {
      this.x = window.innerHeight;
      this.y = window.innerHeight;
      console.log(window.innerHeight);
    } else {
      this.x = window.innerWidth;
      this.y = window.innerWidth;
      console.log(window.innerWidth);
    }
    this.scale = this.x / 15 / 50;
    this.stage = new PIXI.Stage(0x66FF99);
    this.renderer = PIXI.autoDetectRenderer(this.x, this.y);
    document.body.appendChild(this.renderer.view);
    this.makeWorld();
    this.p1 = new Player(this.scale);
    this.stage.addChild(this.p1.sprite);
    this.p1.scale = this.scale;
    console.log(this.scale);
    console.log(this.p1.scale);
  }

  BS.prototype.makeWorld = function() {
    var i, j, _i, _ref, _results;
    this.tab = [[0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    _results = [];
    for (i = _i = 0, _ref = this.tab.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (j = _j = 0, _ref1 = this.tab.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          switch (this.tab[i][j]) {
            case 0:
              this.tab[i][j] = new Grass();
              this.tab[i][j].sprite.position.x = i * 50 * this.scale;
              this.tab[i][j].sprite.position.y = j * 50 * this.scale;
              this.tab[i][j].sprite.scale.x = this.tab[i][j].sprite.scale.y = this.scale;
              _results1.push(this.stage.addChild(this.tab[i][j].sprite));
              break;
            case 1:
              this.tab[i][j] = new Stone();
              this.tab[i][j].sprite.position.x = i * 50 * this.scale;
              this.tab[i][j].sprite.position.y = j * 50 * this.scale;
              this.tab[i][j].sprite.scale.x = this.tab[i][j].sprite.scale.y = this.scale;
              _results1.push(this.stage.addChild(this.tab[i][j].sprite));
              break;
            case 2:
              this.tab[i][j] = new Destro();
              this.tab[i][j].destructable = true;
              this.tab[i][j].sprite.position.x = i * 50 * this.scale;
              this.tab[i][j].sprite.position.y = j * 50 * this.scale;
              this.tab[i][j].sprite.scale.x = this.tab[i][j].sprite.scale.y = this.scale;
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
    this.p1.update();
    return this.renderer.render(this.stage);
  };

  BS.prototype.keyDownTextField = function(e) {
    var keyCode;
    keyCode = e.keyCode;
    switch (keyCode) {
      case 37:
        if (this.p1.position.x >= 1) {
          if (this.tab[this.p1.position.x - 1][this.p1.position.y].moveable === true) {
            return this.p1.position.x -= 1;
          }
        }
        break;
      case 39:
        if (this.p1.position.x < this.x - 1) {
          if (this.tab[this.p1.position.x + 1][this.p1.position.y].moveable === true) {
            return this.p1.position.x += 1;
          }
        }
        break;
      case 38:
        if (this.p1.position.y >= 1) {
          if (this.tab[this.p1.position.x][this.p1.position.y - 1].moveable === true) {
            return this.p1.position.y -= 1;
          }
        }
        break;
      case 40:
        if (this.p1.position.y < this.y - 1) {
          if (this.tab[this.p1.position.x][this.p1.position.y + 1].moveable === true) {
            return this.p1.position.y += 1;
          }
        }
    }
  };

  return BS;

})();

var Grass,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Grass = (function(_super) {
  __extends(Grass, _super);

  function Grass() {
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/white.jpg'));
    this.destructable = false;
    this.moveable = true;
  }

  return Grass;

})(Block);

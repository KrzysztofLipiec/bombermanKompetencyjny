var Grass,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Grass = (function(_super) {
  __extends(Grass, _super);

  function Grass(x, y, scale) {
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/white.jpg'));
    this.destructable = false;
    this.moveable = true;
    this.sprite.position.x = x * 50 * scale;
    this.sprite.position.y = y * 50 * scale;
    this.sprite.scale.x = this.sprite.scale.y = scale;
    this.stone = false;
  }

  return Grass;

})(Block);

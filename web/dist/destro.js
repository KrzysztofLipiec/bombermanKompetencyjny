var Destro,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Destro = (function(_super) {
  __extends(Destro, _super);

  function Destro() {
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/grey.jpg'));
    this.destructable = true;
    this.moveable = false;
  }

  return Destro;

})(Block);

var Stone,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Stone = (function(_super) {
  __extends(Stone, _super);

  function Stone() {
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/black.jpg'));
    this.destructable = false;
    this.moveable = false;
  }

  return Stone;

})(Block);

var Player;

Player = (function() {
  function Player(s) {
    this.s = s;
    this.position = {
      x: 0,
      y: 0
    };
    this.speed = 0.3;
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/right.png'));
    this.sprite.scale.x = this.sprite.scale.y = this.s;
    this.bombCount = 3;
    this.bombRange = 3;
  }

  Player.prototype.update = function() {
    var parent;
    this.sprite.position.x = this.position.x * 50 * this.s;
    this.sprite.position.y = this.position.y * 50 * this.s;
    if (this.sprite.parent) {
      parent = this.sprite.parent;
      parent.removeChild(this.sprite);
      return parent.addChild(this.sprite);
    }
  };

  return Player;

})();

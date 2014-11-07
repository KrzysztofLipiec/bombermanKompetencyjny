var Player;

Player = (function() {
  function Player(s) {
    this.s = s;
    this.position = {
      x: 0,
      y: 0
    };
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/mario.png'));
    this.sprite.scale.x = this.sprite.scale.y = this.s;
  }

  Player.prototype.update = function() {
    this.sprite.position.x = this.position.x * 50 * this.s;
    return this.sprite.position.y = this.position.y * 50 * this.s;
  };

  return Player;

})();

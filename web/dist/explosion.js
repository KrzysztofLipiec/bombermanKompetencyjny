var Explosion;

Explosion = (function() {
  function Explosion(x, y, scale, direction) {
    if (direction === 1) {
      this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/exp_hor.jpg'));
    }
    if (direction === 2) {
      this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/exp_vert.jpg'));
    }
    this.sprite.position.x = x * 50 * scale;
    this.sprite.position.y = y * 50 * scale;
    this.sprite.scale.x = this.sprite.scale.y = scale;
  }

  return Explosion;

})();

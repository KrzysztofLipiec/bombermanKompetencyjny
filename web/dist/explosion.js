var Explosion;

Explosion = (function() {
  function Explosion(x, y, scale, direction) {
    this.x = x;
    this.y = y;
    if (direction === 1) {
      this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/exp_hor.png'));
    }
    if (direction === 2) {
      this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/exp_vert.png'));
    }
    this.sprite.position.x = x * 50 * scale;
    this.sprite.position.y = y * 50 * scale;
    this.sprite.scale.x = this.sprite.scale.y = scale;
    this.explodeable = true;
  }

  return Explosion;

})();

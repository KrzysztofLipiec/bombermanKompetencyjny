var Bonus;

Bonus = (function() {
  function Bonus(x, y, scale, name) {
    this.bonus = name;
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/' + name + '.png'));
    this.sprite.position.x = x * 50 * scale;
    this.sprite.position.y = y * 50 * scale;
    this.sprite.scale.x = this.sprite.scale.y = scale;
  }

  return Bonus;

})();

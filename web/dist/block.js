var Block;

Block = (function() {
  function Block(x, y, scale) {
    this.destructable = null;
    this.moveable = null;
    this.posX = x;
    this.posY = y;
    this.scale = scale;
  }

  return Block;

})();

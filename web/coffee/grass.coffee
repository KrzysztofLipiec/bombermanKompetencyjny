class Grass extends Block
  constructor: ->
    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/white.jpg'));
    @destructable=false
    @moveable=true

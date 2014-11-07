class Destro extends Block
  constructor: ->
    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/grey.jpg'));
    @destructable=true
    @moveable=false
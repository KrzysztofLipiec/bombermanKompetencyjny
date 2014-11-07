class Stone extends Block
  constructor: ->
    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/black.jpg'));
    @destructable=false
    @moveable=false
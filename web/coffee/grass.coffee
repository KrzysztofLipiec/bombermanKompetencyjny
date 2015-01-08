class Grass extends Block
  constructor: (x,y, scale) ->
    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/white.jpg'));
    @destructable=false
    @moveable=true
    @sprite.position.x=x*50*scale
    @sprite.position.y=y*50*scale
    @sprite.scale.x=@sprite.scale.y=scale
    @bomb=false
    @stone=false

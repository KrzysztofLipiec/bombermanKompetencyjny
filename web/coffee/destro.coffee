class Destro extends Block
  constructor: (x,y,scale)->
    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/grey.jpg'));
    @destructable=true
    @moveable=false
    @sprite.position.x=x*50*scale
    @sprite.position.y=y*50*scale
    @sprite.scale.x=@sprite.scale.y=scale
    @stone=false
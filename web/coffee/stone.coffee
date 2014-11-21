class Stone extends Block
  constructor: (x,y,scale)->
    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/black.jpg'));
    @destructable=false
    @moveable=false
    @sprite.position.x=x*50*scale
    @sprite.position.y=y*50*scale
    @sprite.scale.x=@sprite.scale.y=scale
    @stone=true
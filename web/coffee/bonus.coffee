class Bonus
  constructor: (x,y,scale,name)->
    @bonus = name
    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/'+name+'.png'))
    @sprite.position.x=x*50*scale
    @sprite.position.y=y*50*scale
    @sprite.scale.x=@sprite.scale.y=scale
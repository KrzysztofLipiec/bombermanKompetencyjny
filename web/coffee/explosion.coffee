class Explosion
  constructor: (x,y,scale,direction)->
    if (direction==1)
      @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/exp_hor.jpg'))
    if(direction == 2)
      @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/exp_vert.jpg'))
    @sprite.position.x=x*50*scale
    @sprite.position.y=y*50*scale
    @sprite.scale.x=@sprite.scale.y=scale
  explosionClear: (x,y)->
    basicScene.stage.removeChildAt(224)
    #basicScene.obstacles[x][y]=0


class Player

  constructor: (@s) ->
    @position = {
        x:0,
        y:0
    }
    #@world= world
    @speed = 0.3
    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/right.png'))
    @sprite.scale.x=@sprite.scale.y=@s
  update: ->
    @sprite.position.x = @position.x*50*@s
    @sprite.position.y = @position.y*50*@s
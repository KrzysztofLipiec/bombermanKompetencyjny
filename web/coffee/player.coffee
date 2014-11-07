class Player

  constructor: (@s) ->
    @position = {
        x:0,
        y:0
    }
    #@world= world
    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/mario.png'))
    @sprite.scale.x=@sprite.scale.y=@s
  update: ->
    @sprite.position.x = @position.x*50*@s
    @sprite.position.y = @position.y*50*@s
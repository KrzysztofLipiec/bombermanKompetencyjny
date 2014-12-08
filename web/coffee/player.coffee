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
    @bombCount = 3
    @bombRange = 3
    @lifes = 3

  update: ->

    @sprite.position.x = @position.x*50*@s
    @sprite.position.y = @position.y*50*@s
    if(@sprite.parent)
      parent = @sprite.parent
      parent.removeChild(@sprite)
      parent.addChild(@sprite)
    @checkFlame()

  reset: ->
    if @lifes == 0
      alert("Brak zyc")
    @position.x = 0
    @position.y = 0


  checkFlame: ->
    if basicScene.bombsTab.length>0
      for i in [0 .. basicScene.bombsTab.length-1]
        if basicScene.bombsTab[i].flameTab.length>0 #optional
          for j in [0 .. basicScene.bombsTab[i].flameTab.length-1]
            if (basicScene.bombsTab[i].flameTab[j].x == @position.x or basicScene.bombsTab[i].posX == @position.x) and (basicScene.bombsTab[i].flameTab[j].y == @position.y or basicScene.bombsTab[i].posY == @position.y)

              @position.x = -1
              @position.y = -1
              alert("Straciles zycie")
              setTimeout(@reset.bind(@),1500)

              @lifes--
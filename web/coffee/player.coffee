class Player

  constructor: (s,x,y, name) ->
    @position = {
        x:x,
        y:y
    }
    @startPos = {
      x:x,
      y:y
    }
    @name = name
    #@world= world
    @speed = 0.3
    @scale=s
    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/right.png'))
    @sprite.scale.x=@sprite.scale.y=@scale
    @bombCount = 3
    @bombRange = 3
    @lifes = 3

  update: ->
    if @lifes==0
      console.log('Przegrywa gracz: '+@name)
      @lifes = 3
      basicScene.gui.changeLifes(this)
    @sprite.position.x = @position.x*50*@scale
    @sprite.position.y = @position.y*50*@scale
    if(@sprite.parent)
      parent = @sprite.parent
      parent.removeChild(@sprite)
      parent.addChild(@sprite)
    @checkFlame()

  reset: ->
    if @lifes == 0
      console.log("Brak zyc")
    @position.x = @startPos.x
    @position.y = @startPos.y


  checkFlame: ->
    if basicScene.bombsTab.length>0
      for i in [0 .. basicScene.bombsTab.length-1]
        if basicScene.bombsTab[i].flameTab.length>0 #optional
          for j in [0 .. basicScene.bombsTab[i].flameTab.length-1]
            if (basicScene.bombsTab[i].flameTab[j].x == @position.x or basicScene.bombsTab[i].posX == @position.x) and (basicScene.bombsTab[i].flameTab[j].y == @position.y or basicScene.bombsTab[i].posY == @position.y)
              basicScene.tab[@position.x][@position.y].moveable=true
              @position.x = -1
              @position.y = -1

              console.log("Straciles zycie")
              setTimeout(@reset.bind(@),2000)
              basicScene.sendActionMessage("loseLife")
              @lifes--

              basicScene.gui.changeLifes(this)
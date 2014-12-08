class Bomb
  constructor: (x,y,scale)->

    @bomb = true
    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/bomb.png'));
    @sprite.position.x=x*50*scale
    @sprite.position.y=y*50*scale
    @sprite.scale.x=@sprite.scale.y=scale
    @posX = x
    @posY = y
    @flameTab = []
    @exploded = true

  createFlame: (orientation)->

    switch orientation
      when "vertical"
        top = true
        bottom = true
        for i in [1 .. basicScene.p1.bombRange]

          if top
            if (@posY <14 and typeof basicScene.tab[@posY+i] isnt 'undefined')
              if (basicScene.obstacles[@posX][@posY+i].exploded )
                #@exp(@posX,@posY+i)
                top=false
              if(basicScene.tab[@posX][@posY+i].stone==false)
                @flameTab.push(new Explosion(@posX,@posY+i,basicScene.scale,2))
                if(basicScene.tab[@posX][@posY+i].destructable==true)
                  @afterExplode(@posX,@posY+i)
                  top=false
              else
                top = false

          if bottom
            if (@posY >=1 and typeof basicScene.tab[@posY-i] isnt 'undefined')
              if (basicScene.obstacles[@posX][@posY-i].exploded)
                #@exp(@posX,@posY-i)
                bottom=false
              if basicScene.tab[@posX][@posY-i].stone==false
                @flameTab.push(new Explosion(@posX,@posY-i,basicScene.scale,2))
                if(basicScene.tab[@posX][@posY-i].destructable==true)
                  @afterExplode(@posX,@posY-i)
                  bottom=false

              else
                bottom = false

      when "horizontal"
        right = true
        left = true
        for i in [1 .. basicScene.p1.bombRange]

          if right
            if (@posX <14 and typeof basicScene.tab[@posX+i] isnt 'undefined')
              if(basicScene.obstacles[@posX+i][@posY].bomb)
                #@exp(@posX+i,@posY)
                right=false
              if(basicScene.tab[@posX+i][@posY].stone==false)
                @flameTab.push(new Explosion(@posX+i,@posY,basicScene.scale,1))
                if(basicScene.tab[@posX+i][@posY].destructable==true)
                  @afterExplode(@posX+i,@posY)
                  right=false

              else
                right = false

          if left
            if (@posX >=1 and typeof basicScene.tab[@posX-i] isnt 'undefined')
              if(basicScene.obstacles[@posX-i][@posY].bomb)
                #@exp(@posX-i,@posY)
                left=false
              if basicScene.tab[@posX-i][@posY].stone==false
                @flameTab.push(new Explosion(@posX-i,@posY,basicScene.scale,1))
                if(basicScene.tab[@posX-i][@posY].destructable==true)
                  @afterExplode(@posX-i,@posY)
                  left=false

              else
                left = false



  clearFlame: ->
    for i in [0 .. @flameTab.length-1]
      basicScene.stage.removeChild(@flameTab[i].sprite)
      basicScene.stage.removeChild(basicScene.obstacles[@posX][@posY].sprite)
    basicScene.bombsTab.shift()
  exp: (x, y)->
    @exploded=false
    basicScene.obstacles[x][y].sprite.setTexture(PIXI.Texture.fromImage('images/explosion.png'))
    basicScene.tab[x][y].moveable=true
    basicScene.p1.bombCount++


    @createFlame("vertical")
    @createFlame("horizontal")
    for i in [0 .. @flameTab.length-1]
      basicScene.stage.addChild(@flameTab[i].sprite)
    setTimeout(@clearFlame.bind(@),1500)



  afterExplode: (x,y) ->
    rand = Math.floor(Math.random() *3)
    console.log(rand)
    basicScene.tab[x][y] = new Grass(x,y,basicScene.scale)
    basicScene.stage.addChild(basicScene.tab[x][y].sprite)
    switch rand
      when 0
        basicScene.obstacles[x][y] = new Bonus(x,y,basicScene.scale,"hearth")
        basicScene.stage.addChild(basicScene.obstacles[x][y].sprite)

      when 1
        basicScene.obstacles[x][y] = new Bonus(x,y,basicScene.scale,"bombPlus")
        basicScene.stage.addChild(basicScene.obstacles[x][y].sprite)

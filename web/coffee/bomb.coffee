class Bomb
  constructor: (x,y,scale,id)->

    @bomb = true
    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/bomb.png'));
    @sprite.position.x=x*50*scale
    @sprite.position.y=y*50*scale
    @sprite.scale.x=@sprite.scale.y=scale
    @posX = x
    @posY = y
    @flameTab = []
    @exploded = false
    @id = id

  createFlame: (orientation,player,x,y)->
    switch orientation
      when "vertical"
        top = true
        bottom = true
        for i in [1 .. player.bombRange]

          if top
            if (y <14 and typeof basicScene.tab[y+i] isnt 'undefined')
              if (basicScene.obstacles[x][y+i].bomb)
                top=false
                if(basicScene.obstacles[x][y+i].exploded is false)
                  @exp(x,y+i,player)
              if(basicScene.tab[x][y+i].stone==false)
                @flameTab.push(new Explosion(x,y+i,basicScene.scale,2))
                if(basicScene.tab[x][y+i].destructable==true)
                  @afterExplode(x,y+i)
                  top=false
              else
                top = false

          if bottom
            if (y >=1 and typeof basicScene.tab[y-i] isnt 'undefined')
              if (basicScene.obstacles[x][y-i].bomb is true)
                bottom=false
                if(basicScene.obstacles[x][y-i].exploded is false)
                  @exp(x,y-i,player)
              if basicScene.tab[x][y-i].stone==false
                @flameTab.push(new Explosion(x,y-i,basicScene.scale,2))
                if(basicScene.tab[x][y-i].destructable==true)
                  @afterExplode(x,y-i)
                  bottom=false

              else
                bottom = false

      when "horizontal"
        right = true
        left = true
        for i in [1 .. player.bombRange]

          if right
            if (x <14 and typeof basicScene.tab[x+i] isnt 'undefined')
              if(basicScene.obstacles[x+i][y].bomb)
                right=false
                if(basicScene.obstacles[x+i][y].exploded is false)
                  @exp(x+i,y,player)
              if(basicScene.tab[x+i][y].stone==false)
                @flameTab.push(new Explosion(x+i,y,basicScene.scale,1))
                if(basicScene.tab[x+i][y].destructable==true)
                  @afterExplode(x+i,y)
                  right=false

              else
                right = false

          if left
            if (x >=1 and typeof basicScene.tab[x-i] isnt 'undefined')
              if(basicScene.obstacles[x-i][y].bomb)
                left=false
                if(basicScene.obstacles[x-i][y].exploded is false)
                  @exp(x-i,y,player)
              if basicScene.tab[x-i][y].stone==false
                @flameTab.push(new Explosion(x-i,y,basicScene.scale,1))
                if(basicScene.tab[x-i][y].destructable==true)
                  @afterExplode(x-i,y)
                  left=false

              else
                left = false

  explode: (x,y,player) ->
    if (@exploded isnt true)
      @exp(x,y,player)

  clearFlame:(x,y) ->
    for i in [0 .. @flameTab.length-1]
      basicScene.stage.removeChild(@flameTab[i].sprite)
    basicScene.stage.removeChild(basicScene.obstacles[x][y].sprite)
    basicScene.obstacles[x][y]=0
    basicScene.bombsTab.shift()

  exp: (x, y,player)->
    basicScene.obstacles[x][y].exploded = true
    basicScene.obstacles[x][y].sprite.setTexture(PIXI.Texture.fromImage('images/explosion.png'))
    basicScene.tab[x][y].bomb = false
    player.bombCount++
    basicScene.gui.changeBombCount(player)
    @createFlame("horizontal",player,x,y)
    @createFlame("vertical",player,x,y)

    for i in [0 .. @flameTab.length-1]
      basicScene.stage.addChild(@flameTab[i].sprite)
    setTimeout(@clearFlame.bind(@),1500,x,y)



  afterExplode: (x,y) ->
    rand = Math.floor(Math.random() *5)
    basicScene.tab[x][y] = new Grass(x,y,basicScene.scale)
    basicScene.stage.addChild(basicScene.tab[x][y].sprite)
    basicScene.obstacles[x][y] = 0
    switch rand
      when 0
        basicScene.obstacles[x][y] = new Bonus(x,y,basicScene.scale,"hearth")
        basicScene.stage.addChild(basicScene.obstacles[x][y].sprite)

      when 1
        basicScene.obstacles[x][y] = new Bonus(x,y,basicScene.scale,"bombCount")
        basicScene.stage.addChild(basicScene.obstacles[x][y].sprite)

      when 2
        basicScene.obstacles[x][y] = new Bonus(x,y,basicScene.scale,"bombRange")
        basicScene.stage.addChild(basicScene.obstacles[x][y].sprite)

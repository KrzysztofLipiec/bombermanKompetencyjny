class Bomb
  constructor: (x,y,scale)->

    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/bomb.png'));
    @sprite.position.x=x*50*scale
    @sprite.position.y=y*50*scale
    @sprite.scale.x=@sprite.scale.y=scale
    @posX = x
    @posY = y
    @bombTab = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    ];




  explode: (x,y)->
    basicScene.obstacles[x][y].sprite.setTexture(PIXI.Texture.fromImage('images/explosion.png'))
    basicScene.tab[x][y].moveable=true
    basicScene.p1.bombCount++
    breakloop=false
    setTimeout(
      -> basicScene.stage.removeChild(basicScene.obstacles[x][y].sprite)
      1500
    )
    for i in [1 .. basicScene.p1.bombRange]
      if (x <14 && typeof basicScene.tab[x+i] isnt 'undefined')
        if(basicScene.tab[x+i][y].stone==false)
          @createFlame(x+i,y,basicScene.scale,1)
          basicScene.stage.addChild(@bombTab[x+i][y])
          px=x+i
          do (px,y,@bombTab) ->
            setTimeout(
              -> basicScene.stage.removeChild(@bombTab[px][y])
              1500
            )
          if(basicScene.tab[x+i][y].destructable==true)
            afterExplode(x+i,y)
            breakloop=true
        else
          breakloop=true
      break if breakloop
    breakloop=false
    for i in [1 .. basicScene.p1.bombRange]
      if (x>=1 && typeof basicScene.tab[x-i] isnt 'undefined')
        if(basicScene.tab[x-i][y].stone==false)
          @createFlame(x-i,y,basicScene.scale,1)
          basicScene.stage.addChild(@bombTab[x-i][y])
          px=x-i
          do(px,y,@bombTab) ->
            setTimeout(
              -> basicScene.stage.removeChild(@bombTab[px][y])
              1500
            )
          if(basicScene.tab[x-i][y].destructable==true)
            afterExplode(x-i,y)
            breakloop=true
        else
          breakloop=true
      break if breakloop
    breakloop=false
    for i in [1 .. basicScene.p1.bombRange]
      if (y<14 && typeof basicScene.tab[x][y+i] isnt 'undefined')
        if(basicScene.tab[x][y+i].stone==false)
          @createFlame(x,y+i,basicScene.scale,2)
          basicScene.stage.addChild(@bombTab[x][y+i])
          py=y+i
          do(x,py,@bombTab) ->
            setTimeout(
              -> basicScene.stage.removeChild(@bombTab[x][py])
              1500
            )
          if(basicScene.tab[x][y+i].destructable==true)
            afterExplode(x,y+i)
            breakloop=true
        else
          breakloop=true
      break if breakloop
    breakloop=false
    for i in [1 .. basicScene.p1.bombRange]
      if (y >=1 && typeof basicScene.tab[x][y-i] isnt 'undefined')
        if(basicScene.tab[x][y-i].stone==false)
          @createFlame(x,y-i,basicScene.scale,2)
          basicScene.stage.addChild(@bombTab[x][y-i])
          py=y-i
          do(py,@bombTab,x) ->
            setTimeout(
              -> basicScene.stage.removeChild(@bombTab[x][py])
              1500
            )
          if(basicScene.tab[x][y-i].destructable==true)

            afterExplode(x,y-i)
            breakloop=true
        else
          breakloop=true
      break if breakloop
    breakloop=false

  createFlame:(x,y,scale,direction) ->
    if (direction == 1)
      @bombTab[x][y]=new PIXI.Sprite(PIXI.Texture.fromImage('images/exp_hor.jpg'))
    if (direction == 2)
      @bombTab[x][y]=new PIXI.Sprite(PIXI.Texture.fromImage('images/exp_vert.jpg'))
    @bombTab[x][y].position.x=x*50*scale
    @bombTab[x][y].position.y=y*50*scale
    @bombTab[x][y].scale.x=@bombTab[x][y].scale.y=scale



  afterExplode= (x,y) -> #change destructable block to white -> moveable
    basicScene.tab[x][y].sprite.setTexture(PIXI.Texture.fromImage('images/white.jpg'))
    basicScene.tab[x][y].moveable=true



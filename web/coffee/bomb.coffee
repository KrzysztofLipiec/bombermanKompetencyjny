class Bomb
  constructor: (x,y,scale)->

    @sprite = new PIXI.Sprite(PIXI.Texture.fromImage('images/bomb.png'));
    @sprite.position.x=x*50*scale
    @sprite.position.y=y*50*scale
    @sprite.scale.x=@sprite.scale.y=scale
    @posX = x
    @posY = y





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
          basicScene.obstacles[x+i][y]= new Explosion(x+i,y,basicScene.scale,1)
          basicScene.stage.addChild(basicScene.obstacles[x+i][y].sprite)
          px=x+i
          do (px) ->
            setTimeout(
              -> basicScene.stage.removeChild(basicScene.obstacles[px][y].sprite)
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
          basicScene.obstacles[x-i][y]= new Explosion(x-i,y,basicScene.scale,1)
          basicScene.stage.addChild(basicScene.obstacles[x-i][y].sprite)
          px=x-i
          do(px) ->
            setTimeout(
              -> basicScene.stage.removeChild(basicScene.obstacles[px][y].sprite)
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
          basicScene.obstacles[x][y+i]= new Explosion(x,y+i,basicScene.scale,2)
          basicScene.stage.addChild(basicScene.obstacles[x][y+i].sprite)
          py=y+i
          do(py) ->
            setTimeout(
              -> basicScene.stage.removeChild(basicScene.obstacles[x][py].sprite)
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
          basicScene.obstacles[x][y-i]= new Explosion(x,y-i,basicScene.scale,2)
          basicScene.stage.addChild(basicScene.obstacles[x][y-i].sprite)
          py=y-i
          do(py) ->
            setTimeout(
              -> basicScene.stage.removeChild(basicScene.obstacles[x][py].sprite)
              1500
            )
          if(basicScene.tab[x][y-i].destructable==true)

            afterExplode(x,y-i)
            breakloop=true
        else
          breakloop=true
      break if breakloop
    breakloop=false




  afterExplode= (x,y) -> #change destructable block to white - moveable
    basicScene.tab[x][y].sprite.setTexture(PIXI.Texture.fromImage('images/white.jpg'))
    basicScene.tab[x][y].moveable=true



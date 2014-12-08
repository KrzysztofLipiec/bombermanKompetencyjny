class BS
  constructor: ->
    if (window.innerWidth >= window.innerHeight)
      @sizex=window.innerHeight
      @sizey=window.innerHeight
    else
      @sizex=window.innerWidth
      @sizey=window.innerWidth
    @scale=@sizex/15/50
    @stage = new PIXI.Stage(0x66FF99)
    @renderer = PIXI.autoDetectRenderer(@sizex, @sizey)
    document.body.appendChild(@renderer.view)
    @makeWorld()
    @p1 = new Player(@scale)
    @stage.addChild(@p1.sprite)
    @p1.scale=@scale

  makeWorld: ->
    @tab = [
      [0,0,0,0,0,0,2,2,0,0,0,0,0,0,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0],
      [0,1,0,1,0,1,0,1,0,1,2,1,0,1,0],
      [0,0,0,0,0,0,0,0,0,2,0,0,0,0,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    ];

    @obstacles = [
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

    @bombsTab = []

    for j in [0 .. @tab.length-1]
      for i in [0 .. @tab.length-1]
        switch @tab[i][j]
          when 0
            @tab[i][j] = new Grass(i,j,@scale)
            @stage.addChild(@tab[i][j].sprite)
          when 1
            @tab[i][j] = new Stone(i,j,@scale)
            @stage.addChild(@tab[i][j].sprite)
          when 2
            @tab[i][j] = new Destro(i,j,@scale)
            @stage.addChild(@tab[i][j].sprite)



  frame: ->
    setTimeout(@frame.bind(@), 60 / 1000)
    @renderer.render(@stage)
    @p1.update()

  checkObstacle:(x,y)->
    if @obstacles[x][y].bonus
      switch @obstacles[x][y].bonus
        when "hearth"
          @stage.removeChild(@obstacles[x][y].sprite)
          @p1.lifes++
          @obstacles[x][y].sprite = 0
        when "bombPlus"
          @stage.removeChild(@obstacles[x][y].sprite)
          @p1.bombCount++
          @obstacles[x][y].sprite = 0



  keyDownTextField : (e) ->
    keyCode = e.keyCode
    if @p1.position.x %% 1 is 0 and @p1.position.y %% 1 is 0
      switch keyCode
        when (37 or 65)
          if @p1.position.x >=1
            if @tab[@p1.position.x-1][@p1.position.y].moveable==true
              TweenLite.to(@p1.position, @p1.speed, {x:@p1.position.x-1, ease:Linear.easeNone,})
              @p1.sprite.setTexture(PIXI.Texture.fromImage('images/left.png'))
              @checkObstacle(@p1.position.x-1,@p1.position.y)

        when (39 or 68)
          if @p1.position.x <14
            if @tab[@p1.position.x+1][@p1.position.y].moveable==true
              TweenLite.to(@p1.position, @p1.speed, {x:@p1.position.x+1, ease:Linear.easeNone})
              @p1.sprite.setTexture(PIXI.Texture.fromImage('images/right.png'))
              @checkObstacle(@p1.position.x+1,@p1.position.y)

        when (38 or 87)
          if @p1.position.y >=1
            if @tab[@p1.position.x][@p1.position.y-1].moveable==true
              TweenLite.to(@p1.position, @p1.speed,{y:@p1.position.y-1, ease:Linear.easeNone})
              @p1.sprite.setTexture(PIXI.Texture.fromImage('images/up.png'))
              @checkObstacle(@p1.position.x,@p1.position.y-1)

        when (40 or 83)
          if @p1.position.y < 14
            if @tab[@p1.position.x][@p1.position.y+1].moveable==true
              TweenLite.to(@p1.position, @p1.speed, {y:@p1.position.y+1, ease:Linear.easeNone})
              @p1.sprite.setTexture(PIXI.Texture.fromImage('images/down.png'))
              @checkObstacle(@p1.position.x,@p1.position.y+1)

        when 32
          if @p1.bombCount > 0
            #if @obstacles[@p1.position.x][@p1.position.y] == 0
              @obstacles[@p1.position.x][@p1.position.y]= new Bomb(@p1.position.x,@p1.position.y,@scale)
              @bombsTab.push(@obstacles[@p1.position.x][@p1.position.y])
              pozx=@obstacles[@p1.position.x][@p1.position.y].posX
              pozy=@obstacles[@p1.position.x][@p1.position.y].posY
              @stage.addChild(@obstacles[@p1.position.x][@p1.position.y].sprite);
              @tab[@p1.position.x][@p1.position.y].moveable=false
              @p1.bombCount--
              setTimeout(
                -> basicScene.obstacles[pozx][pozy].exp(pozx,pozy)
                3000
              )
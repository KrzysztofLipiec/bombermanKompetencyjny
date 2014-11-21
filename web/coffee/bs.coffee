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
    @p1.update()
    @renderer.render(@stage)



  keyDownTextField : (e) ->
    keyCode = e.keyCode
    if @p1.position.x %% 1 is 0 and @p1.position.y %% 1 is 0
      switch keyCode
        when 37
          if @p1.position.x >=1
            if @tab[@p1.position.x-1][@p1.position.y].moveable==true
              TweenLite.to(@p1.position, @p1.speed, {x:@p1.position.x-1, ease:Linear.easeNone,})
              @p1.sprite.setTexture(PIXI.Texture.fromImage('images/left.png'))
        when 39
          if @p1.position.x <14
            if @tab[@p1.position.x+1][@p1.position.y].moveable==true
              TweenLite.to(@p1.position, @p1.speed, {x:@p1.position.x+1, ease:Linear.easeNone})
              @p1.sprite.setTexture(PIXI.Texture.fromImage('images/right.png'))
        when 38
          if @p1.position.y >=1
            if @tab[@p1.position.x][@p1.position.y-1].moveable==true
              TweenLite.to(@p1.position, @p1.speed,{y:@p1.position.y-1, ease:Linear.easeNone})
              @p1.sprite.setTexture(PIXI.Texture.fromImage('images/up.png'))
        when 40
          if @p1.position.y < 14
            if @tab[@p1.position.x][@p1.position.y+1].moveable==true
              TweenLite.to(@p1.position, @p1.speed, {y:@p1.position.y+1, ease:Linear.easeNone})
              @p1.sprite.setTexture(PIXI.Texture.fromImage('images/down.png'))
        when 32
          if @p1.bombCount > 0
            #if @obstacles[@p1.position.x][@p1.position.y] == 0
              @obstacles[@p1.position.x][@p1.position.y]= new Bomb(@p1.position.x,@p1.position.y,@scale)
              pozx=@obstacles[@p1.position.x][@p1.position.y].posX
              pozy=@obstacles[@p1.position.x][@p1.position.y].posY
              @stage.addChildAt(@obstacles[@p1.position.x][@p1.position.y].sprite,225)
              @tab[@p1.position.x][@p1.position.y].moveable=false
              @p1.bombCount--
              setTimeout(
                -> basicScene.obstacles[pozx][pozy].explode(pozx,pozy)
                3000
              )

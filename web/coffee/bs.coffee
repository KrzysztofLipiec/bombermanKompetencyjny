class BS
  constructor: ->
    if (window.innerWidth >= window.innerHeight)
      @x=window.innerHeight
      @y=window.innerHeight
    else
      @x=window.innerWidth
      @y=window.innerWidth
    @scale=@x/15/50
    @stage = new PIXI.Stage(0x66FF99)
    @renderer = PIXI.autoDetectRenderer(@x, @y)
    document.body.appendChild(@renderer.view)
    @makeWorld()
    @p1 = new Player(@scale)
    @stage.addChild(@p1.sprite)
    @p1.scale=@scale

  makeWorld: ->
    @tab = [
      [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
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
    for i in [0 .. @tab.length-1]
      for j in [0 .. @tab.length-1]
        switch @tab[i][j]
          when 0
            @tab[i][j] = new Grass()
            @tab[i][j].sprite.position.x=i*50*@scale
            @tab[i][j].sprite.position.y=j*50*@scale
            @tab[i][j].sprite.scale.x=@tab[i][j].sprite.scale.y=@scale
            @stage.addChild(@tab[i][j].sprite)
          when 1
            @tab[i][j] = new Stone()
            @tab[i][j].sprite.position.x=i*50*@scale
            @tab[i][j].sprite.position.y=j*50*@scale
            @tab[i][j].sprite.scale.x=@tab[i][j].sprite.scale.y=@scale
            @stage.addChild(@tab[i][j].sprite)
          when 2
            @tab[i][j] = new Destro()
            @tab[i][j].sprite.position.x=i*50*@scale
            @tab[i][j].sprite.position.y=j*50*@scale
            @tab[i][j].sprite.scale.x=@tab[i][j].sprite.scale.y=@scale
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
          if @p1.position.x <@x-1
            if @tab[@p1.position.x+1][@p1.position.y].moveable==true
              TweenLite.to(@p1.position, @p1.speed, {x:@p1.position.x+1, ease:Linear.easeNone})
              @p1.sprite.setTexture(PIXI.Texture.fromImage('images/right.png'))
        when 38
          if @p1.position.y >=1
            if @tab[@p1.position.x][@p1.position.y-1].moveable==true
              TweenLite.to(@p1.position, @p1.speed,{y:@p1.position.y-1, ease:Linear.easeNone})
              @p1.sprite.setTexture(PIXI.Texture.fromImage('images/up.png'))
        when 40
          if @p1.position.y %% 1 is 0
            if @tab[@p1.position.x][@p1.position.y+1].moveable==true
              TweenLite.to(@p1.position, @p1.speed, {y:@p1.position.y+1, ease:Linear.easeNone})
              @p1.sprite.setTexture(PIXI.Texture.fromImage('images/down.png'))

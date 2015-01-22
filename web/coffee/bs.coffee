class BS
  constructor: (gui, controller) ->
    @controller = controller
    if (window.innerWidth >= window.innerHeight)
      @sizex = window.innerHeight - (window.innerHeight/15)
      @sizey = window.innerHeight - (window.innerHeight/15)
    else
      @sizex=window.innerWidth - (window.innerWidth/15)
      @sizey=window.innerWidth - (window.innerWidth/15)
    @scale=@sizex/15/50
    @stage = new PIXI.Stage(0x66FF99)
    @renderer = PIXI.autoDetectRenderer(@sizex, @sizey)
    $("#game").append(@renderer.view)
    @makeWorld()
    myPos = {}
    enPos = {}
    if (window.mySign == "X")
      myPos = {
        x: 0,
        y: 0
      }
      enPos = {
        x: 14,
        y: 14
      }
    else
      myPos = {
        x: 14,
        y: 14
      }
      enPos = {
        x: 0,
        y: 0
      }
    @me = new Player(@scale,myPos.x,myPos.y,'me')
    @enemy = new Player(@scale,enPos.x,enPos.y,'enemy')
    @stage.addChild(@me.sprite)
    @stage.addChild(@enemy.sprite)
    @gui = gui

  makeWorld: ->
    @tab = [
      [0,0,0,2,0,0,2,2,0,0,0,0,0,0,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
      [0,1,2,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0],
      [0,1,0,1,0,1,0,1,0,1,2,1,0,1,0],
      [0,0,0,0,0,0,0,0,0,2,2,0,0,0,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,0,1,2,1,0,1,0,1,0,1,0,1,0],
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
#
#  enemyRandom: () ->
#    setTimeout(@enemyRandom.bind(@), 1000)
#    rand = Math.floor(Math.random() *5)
#    switch rand
#      when 0
#        @moveLeft(@enemy)
#      when 1
#        @moveRight(@enemy)
#      when 2
#        @moveUp(@enemy)
#      when 3
#        @moveDown(@enemy)
#      when 4
#        @placeBomb(@enemy)



  frame:() ->
    @renderer.render(@stage)
    @me.update()
    @enemy.update()
    setTimeout(@frame.bind(@), 60 / 1000)

  checkObstacle:(x,y,player)->
    if @obstacles[x][y].bonus
      switch @obstacles[x][y].bonus
        when "hearth"
          @stage.removeChild(@obstacles[x][y].sprite)
          player.lifes++
          gui.changeLifes(player)
          @obstacles[x][y]= 0
        when "bombCount"
          @stage.removeChild(@obstacles[x][y].sprite)
          player.bombCount++
          gui.changeBombCount(player)
          @obstacles[x][y]= 0
        when "bombRange"
          @stage.removeChild(@obstacles[x][y].sprite)
          player.bombRange++
          gui.changeBombRange(player)
          @obstacles[x][y]= 0

  makeMoveable:(x,y) ->
    basicScene.tab[x][y].moveable=true

  sendActionMessage: (action)->
    $.ajax({
      url: "/action",
      data: {
        "g": window.game_key,
        "action": action,
        "player": window.mySign
      }
      method: "post"
    })

  sendMoveMessage: (dir)->
    $.ajax({
      url: "/move",
      data: {
        "g": window.game_key,
        "direction": dir,
        "player": window.mySign
      }
      method: "post"
    })
  moveLeft: (player)->
    if player.position.x >=1 and typeof @tab[player.position.x-1][player.position.y] isnt 'undefined'
      if (@tab[player.position.x-1][player.position.y].moveable and @tab[player.position.x-1][player.position.y].bomb is false)

        @tab[player.position.x][player.position.y].moveable=false
        @tab[player.position.x-1][player.position.y].moveable=false
        TweenLite.to(player.position, player.speed, {x:player.position.x-1, ease:Linear.easeNone, onComplete:@makeMoveable, onCompleteParams:[player.position.x,player.position.y]})
        player.sprite.setTexture(PIXI.Texture.fromImage('images/left.png'))
        @checkObstacle(player.position.x-1,player.position.y,player)

  moveRight: (player)->
    if player.position.x <14 and typeof @tab[player.position.x+1][player.position.y] isnt 'undefined'
      if (@tab[player.position.x+1][player.position.y].moveable and @tab[player.position.x+1][player.position.y].bomb is false)

        @tab[player.position.x][player.position.y].moveable=false
        @tab[player.position.x+1][player.position.y].moveable=false
        TweenLite.to(player.position, player.speed, {x:player.position.x+1, ease:Linear.easeNone, onComplete:@makeMoveable, onCompleteParams:[player.position.x,player.position.y]})
        player.sprite.setTexture(PIXI.Texture.fromImage('images/right.png'))
        @checkObstacle(player.position.x+1,player.position.y,player)

  moveUp:(player) ->
    if player.position.y >=1 and typeof @tab[player.position.x][player.position.y-1] isnt 'undefined'
      if (@tab[player.position.x][player.position.y-1].moveable and @tab[player.position.x][player.position.y-1].bomb is false)
        @tab[player.position.x][player.position.y].moveable=false
        @tab[player.position.x][player.position.y-1].moveable=false
        TweenLite.to(player.position, player.speed,{y:player.position.y-1, ease:Linear.easeNone, onComplete:@makeMoveable, onCompleteParams:[player.position.x,player.position.y]})
        player.sprite.setTexture(PIXI.Texture.fromImage('images/up.png'))
        @checkObstacle(player.position.x,player.position.y-1,player)

  moveDown:(player)->
    if player.position.y < 14 and typeof @tab[player.position.x] isnt 'undefined'
      if (@tab[player.position.x][player.position.y+1].moveable and @tab[player.position.x][player.position.y+1].bomb is false)
        @tab[player.position.x][player.position.y].moveable=false
        @tab[player.position.x][player.position.y+1].moveable=false
        TweenLite.to(player.position, player.speed, {y:player.position.y+1, ease:Linear.easeNone, onComplete:@makeMoveable, onCompleteParams:[player.position.x,player.position.y]})
        player.sprite.setTexture(PIXI.Texture.fromImage('images/down.png'))
        @checkObstacle(player.position.x,player.position.y+1,player)

  placeBomb:(player)->
    if player.bombCount > 0 and typeof @obstacles[player.position.x] isnt 'undefined'
      if @obstacles[player.position.x][player.position.y]==0
        @obstacles[player.position.x][player.position.y]= new Bomb(player.position.x,player.position.y,@scale)
        @bombsTab.push(@obstacles[player.position.x][player.position.y])
        pozx=@obstacles[player.position.x][player.position.y].posX
        pozy=@obstacles[player.position.x][player.position.y].posY
        @stage.addChild(@obstacles[player.position.x][player.position.y].sprite);
        @tab[player.position.x][player.position.y].bomb=true
        --player.bombCount
        gui.changeBombCount(player)
        setTimeout(
          -> basicScene.obstacles[pozx][pozy].explode(pozx,pozy,player)
          3000
        )



  keyDownTextField : (e) ->
    keyCode = e.keyCode
    if @me.position.x %% 1 is 0 and @me.position.y %% 1 is 0
      switch keyCode
        when 37
          @sendMoveMessage("left");
          @moveLeft(@me)
        when 65
          @sendMoveMessage("left");
          @moveLeft(@me)
        when 39
          @sendMoveMessage("right");
          @moveRight(@me)
        when 68
          @sendMoveMessage("right");
          @moveRight(@me)
        when 38
          @sendMoveMessage("up");
          @moveUp(@me)
        when 87
          @sendMoveMessage("up");
          @moveUp(@me)
        when 40
          @sendMoveMessage("down");
          @moveDown(@me)
        when 83
          @sendMoveMessage("down");
          @moveDown(@me)
        when 32
          @sendActionMessage("placeBomb");
          @placeBomb(basicScene.me)
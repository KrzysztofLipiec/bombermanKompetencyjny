class GUI
  constructor: ->
    if (window.innerWidth >= window.innerHeight)
      @sizex = window.innerHeight - (window.innerHeight / 15)
      @sizey = (window.innerHeight / 15)
    else
      @sizex=window.innerWidth - (window.innerWidth / 15)
      @sizey = window.innerWidth / 15
    @scale=(@sizey/70)
    @stage = new PIXI.Stage(0xFFFFFF)
    @renderer = PIXI.autoDetectRenderer(@sizex, @sizey)
    document.getElementById('gui').appendChild(@renderer.view)
    @frameEnd = @sizex-@sizey
    @makeMenu()
    @renderer.render(@stage)


  makeMenu : ->
    @menu =[0,0,0,0,0,0,0,0,0,0,0]
    @menu[0] = new PIXI.Sprite(PIXI.Texture.fromImage('images/hearth.png'));
    @menu[0].scale.x=@menu[0].scale.y=@scale
    @stage.addChild(@menu[0])
    @menu[1] = new PIXI.Text('3', {font:@sizey+"px Arial", fill:"red"});
    @menu[1].position.x=1*50*@scale
    @stage.addChild(@menu[1])
    @menu[2] = new PIXI.Sprite(PIXI.Texture.fromImage('images/bomb.png'));
    @menu[2].scale.x=@menu[2].scale.y=@scale
    @menu[2].position.x=3*50*@scale
    @stage.addChild(@menu[2])
    @menu[3] = new PIXI.Text('3', {font:@sizey+"px Arial", fill:"red"});
    @menu[3].position.x=4*50*@scale
    @stage.addChild(@menu[3])
    @menu[4] = new PIXI.Sprite(PIXI.Texture.fromImage('images/bombRange.png'));
    @menu[4].scale.x=@menu[4].scale.y=@scale
    @menu[4].position.x=6*50*@scale
    @stage.addChild(@menu[4])
    @menu[5] = new PIXI.Text('3', {font:@sizey+"px Arial", fill:"red"});
    @menu[5].position.x=7*50*@scale
    @stage.addChild(@menu[5])
    #enemy
    @menu[6] = new PIXI.Sprite(PIXI.Texture.fromImage('images/hearth.png'));
    @menu[6].scale.x=@menu[6].scale.y=@scale
    @menu[6].position.x=@frameEnd-7*50*@scale
    @stage.addChild(@menu[6])
    @menu[7] = new PIXI.Text(3, {font:@sizey+"px Arial", fill:"black"});
    @menu[7].position.x=@frameEnd-6*50*@scale
    @stage.addChild(@menu[7])
    @menu[8] = new PIXI.Sprite(PIXI.Texture.fromImage('images/bomb.png'));
    @menu[8].scale.x=@menu[8].scale.y=@scale
    @menu[8].position.x=@frameEnd-4*50*@scale
    @stage.addChild(@menu[8])
    @menu[9] = new PIXI.Text(3, {font:@sizey+"px Arial", fill:"black"});
    @menu[9].position.x=@frameEnd-3*50*@scale
    @stage.addChild(@menu[9])
    @menu[10] = new PIXI.Sprite(PIXI.Texture.fromImage('images/bombRange.png'));
    @menu[10].scale.x=@menu[10].scale.y=@scale
    @menu[10].position.x=@frameEnd-1*50*@scale
    @stage.addChild(@menu[10])
    @menu[11] = new PIXI.Text(3, {font:@sizey+"px Arial", fill:"black"});
    @menu[11].position.x=@frameEnd
    @stage.addChild(@menu[11])



  changeLifes: (player)->
    switch player.name
      when 'me'
        @menu[1].setText(basicScene.me.lifes)
        @renderer.render(@stage)
      when 'enemy'
        @menu[7].setText(basicScene.enemy.lifes)
        @renderer.render(@stage)

  changeBombCount: (player) ->
    switch player.name
      when 'me'
        @menu[3].setText(basicScene.me.bombCount)
        @renderer.render(@stage)
      when 'enemy'
        @menu[9].setText(basicScene.enemy.bombCount)
        @renderer.render(@stage)

  changeBombRange: (player) ->
    switch player.name
      when 'me'
        @menu[5].setText(basicScene.me.bombRange)
        @renderer.render(@stage)
      when 'enemy'
        @menu[11].setText(basicScene.enemy.bombRange)
        @renderer.render(@stage)
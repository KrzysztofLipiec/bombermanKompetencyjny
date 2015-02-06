class channelController

  constructor: (promise)->
    @promise = promise
    self = @;
    channel = new goog.appengine.Channel(window.token)
    socket = channel.open()
    socket.onopen = self.onOpened
    socket.onmessage = self.onMessage.bind(@)
    socket.onerror = self.onError
    socket.onclose = self.onClose
    @opened = false

  update: ->
    result = "game"
    display = {
      "#displayGame": "block",
      "#displayWaiting": "none"
    }
    if(!window.userO || window.userO == "")
      result = "waiting"
      display["#displayGame"] = "none"
      display["#displayWaiting"] = "block"

    $.each(display, (label)->
      $(label).css("display", display[label])
    )

    if(result == "game" && !@opened)
      @opened = true
      @websocket = new WebSocket("ws://localhost:9876/game");
      @websocket.onopen = (evt)->
        console.log("opened")
      @websocket.onmessage = (evt)->
        data = JSON.parse(evt.data)
        if data.action == "loseLife":
          basicScene.enemy.lifes--
          gui.changeLifes(basicScene.enemy)
        if data.action == "getBonus"
          console.log("getBonus")
          switch data.options.bonus
            when 'life'
              console.log("life")
              basicScene.enemy.lifes++
              gui.changeLifes(basicScene.enemy)
            when 'range'
              console.log("range")
              basicScene.enemy.bombRange++
              gui.changeBombRange(basicScene.enemy)
            when 'bomb'
              console.log("bomb")
              basicScene.enemy.bombCount++
              gui.changeBombCount(basicScene.enemy)
            else
              console.log("bonus error")
        if data.action == "placeBomb"
            basicScene.placeBomb(basicScene.enemy)
        if data.action == "move"
          switch data.direction
            when 'right'
              basicScene.moveRight(basicScene.enemy)
            when 'left'
              basicScene.moveLeft(basicScene.enemy)
            when 'up'
              basicScene.moveUp(basicScene.enemy)
            when 'down'
              basicScene.moveDown(basicScene.enemy)
            else
              console.log("move error")
      @promise.resolve()
    else
      setTimeout(@update.bind(@), 60/1000)


  onOpened: ->
    sendMessage = (path, opt_param)->
      path += '?g=' + window.game_key;
      if (opt_param)
        path += '&' + opt_param;

      xhr = new XMLHttpRequest();
      xhr.open('POST', path, true);
      xhr.send()
    sendMessage("/opened")
  onMessage: (m)->
    newState = JSON.parse(m.data)
    window.userX = newState.userX || window.userX
    window.userO = newState.userO || window.userO
    window.winner = newState.winner || window.winner
    @update()

  onClose: ->

  onError: ->

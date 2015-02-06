startGame = $.Deferred()
gui = null
basicScene = null
chanel = new channelController(startGame)
startGame.done(->
  gui = new GUI
  basicScene = new BS(gui, chanel)
  document.addEventListener "keydown", basicScene.keyDownTextField.bind(basicScene), false
  basicScene.frame()
)

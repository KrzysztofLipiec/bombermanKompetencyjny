var basicScene, chanel, gui, startGame;

startGame = $.Deferred();

gui = null;

basicScene = null;

chanel = new channelController(startGame);

startGame.done(function() {
  gui = new GUI;
  basicScene = new BS(gui, chanel);
  document.addEventListener("keydown", basicScene.keyDownTextField.bind(basicScene), false);
  return basicScene.frame();
});

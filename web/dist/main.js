var basicScene, chanel, gui, startGame;

startGame = $.Deferred();

gui = null;

basicScene = null;

chanel = new channelController(startGame);

startGame.done(function() {
  window.history.pushState('page2', 'Title', window.link);
  gui = new GUI;
  basicScene = new BS(gui, chanel);
  document.addEventListener("keydown", basicScene.keyDownTextField.bind(basicScene), false);
  return basicScene.frame();
});

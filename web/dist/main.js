var basicScene, gui;

gui = new GUI;

basicScene = new BS(gui);

document.addEventListener("keydown", basicScene.keyDownTextField.bind(basicScene), false);

basicScene.frame();

basicScene.enemyRandom();

var basicScene;

basicScene = new BS;

document.addEventListener("keypress", basicScene.keyDownTextField.bind(basicScene), false);

basicScene.frame();

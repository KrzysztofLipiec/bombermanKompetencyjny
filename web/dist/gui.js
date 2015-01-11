var GUI;

GUI = (function() {
  function GUI() {
    if (window.innerWidth >= window.innerHeight) {
      this.sizex = window.innerHeight - (window.innerHeight / 15);
      this.sizey = window.innerHeight / 15;
    } else {
      this.sizex = window.innerWidth - (window.innerWidth / 15);
      this.sizey = window.innerWidth / 15;
    }
    this.scale = this.sizey / 70;
    this.stage = new PIXI.Stage(0xFFFFFF);
    this.renderer = PIXI.autoDetectRenderer(this.sizex, this.sizey);
    document.getElementById('gui').appendChild(this.renderer.view);
    this.frameEnd = this.sizex - this.sizey;
    this.makeMenu();
    this.renderer.render(this.stage);
  }

  GUI.prototype.makeMenu = function() {
    this.menu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.menu[0] = new PIXI.Sprite(PIXI.Texture.fromImage('images/hearth.png'));
    this.menu[0].scale.x = this.menu[0].scale.y = this.scale;
    this.stage.addChild(this.menu[0]);
    this.menu[1] = new PIXI.Text('3', {
      font: this.sizey + "px Arial",
      fill: "red"
    });
    this.menu[1].position.x = 1 * 50 * this.scale;
    this.stage.addChild(this.menu[1]);
    this.menu[2] = new PIXI.Sprite(PIXI.Texture.fromImage('images/bomb.png'));
    this.menu[2].scale.x = this.menu[2].scale.y = this.scale;
    this.menu[2].position.x = 3 * 50 * this.scale;
    this.stage.addChild(this.menu[2]);
    this.menu[3] = new PIXI.Text('3', {
      font: this.sizey + "px Arial",
      fill: "red"
    });
    this.menu[3].position.x = 4 * 50 * this.scale;
    this.stage.addChild(this.menu[3]);
    this.menu[4] = new PIXI.Sprite(PIXI.Texture.fromImage('images/bombRange.png'));
    this.menu[4].scale.x = this.menu[4].scale.y = this.scale;
    this.menu[4].position.x = 6 * 50 * this.scale;
    this.stage.addChild(this.menu[4]);
    this.menu[5] = new PIXI.Text('3', {
      font: this.sizey + "px Arial",
      fill: "red"
    });
    this.menu[5].position.x = 7 * 50 * this.scale;
    this.stage.addChild(this.menu[5]);
    this.menu[6] = new PIXI.Sprite(PIXI.Texture.fromImage('images/hearth.png'));
    this.menu[6].scale.x = this.menu[6].scale.y = this.scale;
    this.menu[6].position.x = this.frameEnd - 7 * 50 * this.scale;
    this.stage.addChild(this.menu[6]);
    this.menu[7] = new PIXI.Text(3, {
      font: this.sizey + "px Arial",
      fill: "black"
    });
    this.menu[7].position.x = this.frameEnd - 6 * 50 * this.scale;
    this.stage.addChild(this.menu[7]);
    this.menu[8] = new PIXI.Sprite(PIXI.Texture.fromImage('images/bomb.png'));
    this.menu[8].scale.x = this.menu[8].scale.y = this.scale;
    this.menu[8].position.x = this.frameEnd - 4 * 50 * this.scale;
    this.stage.addChild(this.menu[8]);
    this.menu[9] = new PIXI.Text(3, {
      font: this.sizey + "px Arial",
      fill: "black"
    });
    this.menu[9].position.x = this.frameEnd - 3 * 50 * this.scale;
    this.stage.addChild(this.menu[9]);
    this.menu[10] = new PIXI.Sprite(PIXI.Texture.fromImage('images/bombRange.png'));
    this.menu[10].scale.x = this.menu[10].scale.y = this.scale;
    this.menu[10].position.x = this.frameEnd - 1 * 50 * this.scale;
    this.stage.addChild(this.menu[10]);
    this.menu[11] = new PIXI.Text(3, {
      font: this.sizey + "px Arial",
      fill: "black"
    });
    this.menu[11].position.x = this.frameEnd;
    return this.stage.addChild(this.menu[11]);
  };

  GUI.prototype.changeLifes = function(player) {
    switch (player.name) {
      case 'me':
        this.menu[1].setText(basicScene.me.lifes);
        return this.renderer.render(this.stage);
      case 'enemy':
        this.menu[7].setText(basicScene.enemy.lifes);
        return this.renderer.render(this.stage);
    }
  };

  GUI.prototype.changeBombCount = function(player) {
    switch (player.name) {
      case 'me':
        this.menu[3].setText(basicScene.me.bombCount);
        return this.renderer.render(this.stage);
      case 'enemy':
        this.menu[9].setText(basicScene.enemy.bombCount);
        return this.renderer.render(this.stage);
    }
  };

  GUI.prototype.changeBombRange = function(player) {
    switch (player.name) {
      case 'me':
        this.menu[5].setText(basicScene.me.bombRange);
        return this.renderer.render(this.stage);
      case 'enemy':
        this.menu[11].setText(basicScene.enemy.bombRange);
        return this.renderer.render(this.stage);
    }
  };

  return GUI;

})();

var BS;

BS = (function() {
  function BS() {
    var renderer, stage;
    stage = new PIXI.Stage(0x66FF99);
    renderer = PIXI.autoDetectRenderer(400, 300);
    console.log(renderer);
    document.body.appendChild(renderer.view);
  }

  BS.prototype.frame = function() {
    return setTimeout(this.frame.bind(this), 60 / 1000);
  };

  return BS;

})();

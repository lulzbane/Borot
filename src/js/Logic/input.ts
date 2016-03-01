module Logic.Input {
  import config = Config;
  import player = Player;
  import grid = Gfx.Grid;
  import text = Gfx.Text;

  var mousePosition = { x: 0, y: 0};
  export var playerInputStarted = false;

  function keyPressed(e) {
    for (var control in config.gameConfig.input.controls) {
      if (config.gameConfig.input.controls.hasOwnProperty(control)) {
        if (control === e.keyCode.toString()) {
          if (!playerInputStarted) {
            playerInputStarted = true;
          }
          player[config.gameConfig.input.controls[control]]();
        }
      }
    }
  }

  function getMousePosition(e, canvas) {
    var canvasRectangle = canvas.getBoundingClientRect();
    mousePosition = {
      x: e.clientX - canvasRectangle.left,
      y: e.clientY - canvasRectangle.top
    };
    return mousePosition;
  }

  function mouseMoved(e, canvas) {
    grid.mouseInputReceived(getMousePosition(e, canvas), false);
  }

  function mouseClicked(e, canvas) {
    var validClick = grid.mouseInputReceived(getMousePosition(e, canvas), true); 
    if (validClick && !playerInputStarted) {
      playerInputStarted = true;
      text.hideMessage();
    }
  }

  export function init() {
    window.addEventListener("keypress", keyPressed);
    var foregroundCanvas = <HTMLCanvasElement>document.getElementById('foreground');
    foregroundCanvas.addEventListener('mousemove', (e) => { mouseMoved(e, foregroundCanvas) });
    foregroundCanvas.addEventListener('click', (e) => { mouseClicked(e, foregroundCanvas) });
  }
}
module Logic.Input {
  import config = Config;
  import player = Player;

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

  export function init() {
    window.addEventListener("keypress", keyPressed);
  }
}
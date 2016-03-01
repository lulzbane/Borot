var Logic;
(function (Logic) {
    var Input;
    (function (Input) {
        var config = Config;
        var player = Logic.Player;
        Input.playerInputStarted = false;
        function keyPressed(e) {
            for (var control in config.gameConfig.input.controls) {
                if (config.gameConfig.input.controls.hasOwnProperty(control)) {
                    if (control === e.keyCode.toString()) {
                        if (!Input.playerInputStarted) {
                            Input.playerInputStarted = true;
                        }
                        player[config.gameConfig.input.controls[control]]();
                    }
                }
            }
        }
        function init() {
            window.addEventListener("keypress", keyPressed);
        }
        Input.init = init;
    })(Input = Logic.Input || (Logic.Input = {}));
})(Logic || (Logic = {}));
//# sourceMappingURL=input.js.map
var Logic;
(function (Logic) {
    var Input;
    (function (Input) {
        var config = Config;
        var player = Logic.Player;
        var grid = Gfx.Grid;
        var text = Gfx.Text;
        var mousePosition = { x: 0, y: 0 };
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
            if (validClick && !Input.playerInputStarted) {
                Input.playerInputStarted = true;
                text.hideMessage();
            }
        }
        function init() {
            window.addEventListener("keypress", keyPressed);
            var foregroundCanvas = document.getElementById('foreground');
            foregroundCanvas.addEventListener('mousemove', function (e) { mouseMoved(e, foregroundCanvas); });
            foregroundCanvas.addEventListener('click', function (e) { mouseClicked(e, foregroundCanvas); });
        }
        Input.init = init;
    })(Input = Logic.Input || (Logic.Input = {}));
})(Logic || (Logic = {}));
//# sourceMappingURL=input.js.map
var Logic;
(function (Logic) {
    var Loop;
    (function (Loop) {
        var screen = Gfx.Screen;
        function gameLoop() {
            window.requestAnimationFrame(gameLoop);
            screen.render();
        }
        function start() {
            gameLoop();
        }
        Loop.start = start;
    })(Loop = Logic.Loop || (Logic.Loop = {}));
})(Logic || (Logic = {}));
//# sourceMappingURL=loop.js.map
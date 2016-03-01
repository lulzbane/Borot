var Gfx;
(function (Gfx) {
    var Drone;
    (function (Drone) {
        function moveUp() {
            console.log("up");
        }
        Drone.moveUp = moveUp;
        function moveLeft() {
            console.log("left");
        }
        Drone.moveLeft = moveLeft;
        function moveDown() {
            console.log("down");
        }
        Drone.moveDown = moveDown;
        function moveRight() {
            console.log("right");
        }
        Drone.moveRight = moveRight;
    })(Drone = Gfx.Drone || (Gfx.Drone = {}));
})(Gfx || (Gfx = {}));
//# sourceMappingURL=drone.js.map
var Gfx;
(function (Gfx) {
    var Borot;
    (function (Borot) {
        function moveUp() {
            console.log("up");
        }
        Borot.moveUp = moveUp;
        function moveLeft() {
            console.log("left");
        }
        Borot.moveLeft = moveLeft;
        function moveDown() {
            console.log("down");
        }
        Borot.moveDown = moveDown;
        function moveRight() {
            console.log("right");
        }
        Borot.moveRight = moveRight;
    })(Borot = Gfx.Borot || (Gfx.Borot = {}));
})(Gfx || (Gfx = {}));
//# sourceMappingURL=borot.js.map
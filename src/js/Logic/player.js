var Logic;
(function (Logic) {
    var Player;
    (function (Player) {
        var config = Config;
        var maths = Utils.Maths;
        var text = Gfx.Text;
        Player.directionEnum = {
            NORTH: 0,
            WEST: 1,
            SOUTH: 2,
            EAST: 3
        };
        Player.isConfused = false;
        Player.tilePosition = { x: 0, y: 0 };
        Player.collisionMapPosition = { x: 0, y: 0 };
        Player.pixelPosition = { x: 0, y: 0 };
        Player.drawSize = { width: 0, height: 0 };
        Player.moveDistance = { x: 0, y: 0 };
        Player.state = { assetName: "", textName: "", enumValue: -1 };
        function getStateFromEnum(facingEnum) {
            for (var state in config.gameConfig.borot.state) {
                if (config.gameConfig.borot.state.hasOwnProperty(state)) {
                    if (config.gameConfig.borot.state[state].enumValue === facingEnum) {
                        return config.gameConfig.borot.state[state];
                    }
                }
            }
            return {};
        }
        function setPixelPosition(tilePositionX, tilePositionY) {
            var getPixelPosition = maths.getPixelPositionFromTilePosition(tilePositionX, tilePositionY, config.gameConfig.borot.mapOffset.x, config.gameConfig.borot.mapOffset.y, config.gameConfig.grid.collisionTileDistance.x, config.gameConfig.grid.collisionTileDistance.y);
            Player.pixelPosition.x = getPixelPosition.x;
            Player.pixelPosition.y = getPixelPosition.y;
        }
        function init() {
            Player.drawSize = config.gameConfig.borot.size;
            Player.collisionMapPosition = config.gameConfig.borot.collisionMapStart;
            Player.moveDistance = { x: config.gameConfig.borot.size.width, y: config.gameConfig.borot.size.height };
            PLACE(config.gameConfig.borot.tilemapStart.x, config.gameConfig.borot.tilemapStart.y, config.gameConfig.borot.startingDirection);
        }
        Player.init = init;
        function MOVE() {
            if (checkCollision()) {
                // goes forward in it's current direction
                switch (Player.state.enumValue) {
                    case Player.directionEnum.NORTH:
                        Player.tilePosition.y = Player.tilePosition.y - 1;
                        Player.collisionMapPosition.y = Player.collisionMapPosition.y - 1;
                        break;
                    case Player.directionEnum.WEST:
                        Player.tilePosition.x = Player.tilePosition.x - 1;
                        Player.collisionMapPosition.x = Player.collisionMapPosition.x - 1;
                        break;
                    case Player.directionEnum.SOUTH:
                        Player.tilePosition.y = Player.tilePosition.y + 1;
                        Player.collisionMapPosition.y = Player.collisionMapPosition.y + 1;
                        break;
                    case Player.directionEnum.EAST:
                        Player.tilePosition.x = Player.tilePosition.x + 1;
                        Player.collisionMapPosition.x = Player.collisionMapPosition.x + 1;
                        break;
                }
                PLACE(Player.tilePosition.x, Player.tilePosition.y, Player.state.enumValue);
            }
            Player.isConfused = false;
        }
        Player.MOVE = MOVE;
        function face(direction) {
            Player.state = getStateFromEnum(direction);
        }
        function LEFT() {
            // rotates direction counterclockwise once
            if (Player.state.enumValue === Player.directionEnum.EAST) {
                face(Player.directionEnum.NORTH);
            }
            else {
                face(Player.state.enumValue + 1);
            }
            Player.isConfused = false;
        }
        Player.LEFT = LEFT;
        function RIGHT() {
            // rotates direction counterclockwise once
            if (Player.state.enumValue === Player.directionEnum.NORTH) {
                face(Player.directionEnum.EAST);
            }
            else {
                face(Player.state.enumValue - 1);
            }
            Player.isConfused = false;
        }
        Player.RIGHT = RIGHT;
        function REPORT() {
            var message = "hello human! i am " + Player.collisionMapPosition.x + " meters from the EAST of the island, " + ((config.gameConfig.grid.collisionMap.length - 1) - Player.collisionMapPosition.y) + " meters from the SOUTH and i'm facing " + Player.state.textName.toUpperCase();
            text.showMessage(message);
            Player.isConfused = false;
        }
        Player.REPORT = REPORT;
        function getRandomTilePosition() {
            return {
                x: maths.getRandomIntInclusive(0, config.gameConfig.grid.collisionMap.length - 1),
                y: maths.getRandomIntInclusive(0, config.gameConfig.grid.collisionMap[0].length - 1)
            };
        }
        function getRandomDirection() {
            return maths.getRandomIntInclusive(0, 3);
        }
        function CONFUSE() {
            Player.isConfused = true;
            var showConfusion = function () {
                var message = "bzzt!! bzzzt!! blip! blip! bzzzzz... already at location... instructions unclear... STANDBY!";
                text.showMessage(message);
                var confusionAction = function () {
                    if (Player.isConfused) {
                        var newPosition = getRandomTilePosition();
                        var newDirection = getRandomDirection();
                        face(newDirection);
                        PLACE(newPosition.x, newPosition.y, Player.state.enumValue);
                        message = "CONFUSION PERSISTING... moving to " + newPosition.x + " from EAST end, " + ((config.gameConfig.grid.collisionMap.length - 1) - newPosition.y) + " from SOUTH... heading " + Player.state.textName.toUpperCase() + "... STANDBY!";
                        text.showMessage(message);
                        setTimeout(confusionAction, config.gameConfig.borot.confusionDelay);
                    }
                };
                setTimeout(confusionAction, config.gameConfig.borot.confusionDelay);
            };
            setTimeout(showConfusion, 100);
        }
        Player.CONFUSE = CONFUSE;
        function PLACE(tilePositionX, tilePositionY, faceDirection) {
            face(faceDirection);
            Player.tilePosition.x = tilePositionX;
            Player.tilePosition.y = tilePositionY;
            Player.collisionMapPosition.x = tilePositionX;
            Player.collisionMapPosition.y = tilePositionY;
            setPixelPosition(tilePositionX, tilePositionY);
        }
        Player.PLACE = PLACE;
        function checkCollision() {
            var canMove = false;
            switch (Player.state.enumValue) {
                case Player.directionEnum.NORTH:
                    if (Player.collisionMapPosition.y > 0) {
                        canMove = true;
                    }
                    break;
                case Player.directionEnum.WEST:
                    if (Player.collisionMapPosition.x > 0) {
                        canMove = true;
                    }
                    break;
                case Player.directionEnum.SOUTH:
                    if (Player.collisionMapPosition.y < config.gameConfig.grid.collisionMap.length - 1) {
                        canMove = true;
                    }
                    break;
                case Player.directionEnum.EAST:
                    if (Player.collisionMapPosition.x < config.gameConfig.grid.collisionMap[Player.collisionMapPosition.y].length - 1) {
                        canMove = true;
                    }
                    break;
            }
            if (!canMove) {
                text.showMessage("PC LOAD LETTER... does not compute... this island is my home");
            }
            else {
                text.hideMessage();
            }
            return canMove;
        }
        Player.checkCollision = checkCollision;
    })(Player = Logic.Player || (Logic.Player = {}));
})(Logic || (Logic = {}));
//# sourceMappingURL=player.js.map
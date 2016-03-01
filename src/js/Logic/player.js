var Logic;
(function (Logic) {
    var Player;
    (function (Player) {
        var config = Config;
        var maths = Utils.Maths;
        Player.directionEnum = {
            NORTH: 0,
            WEST: 1,
            SOUTH: 2,
            EAST: 3
        };
        Player.tilePosition = { x: 0, y: 0 };
        Player.pixelPosition = { x: 0, y: 0 };
        Player.drawSize = { width: 0, height: 0 };
        Player.moveDistance = { x: 0, y: 0 };
        Player.state = { assetName: "", enumValue: -1 };
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
            console.log('x' + tilePositionX + ' y' + tilePositionY + ' ox' + config.gameConfig.borot.mapOffset.x + ' oy' + config.gameConfig.borot.mapOffset.y + ' w' + config.gameConfig.tiles.tileDimensions.width + ' h' + config.gameConfig.tiles.tileDimensions.height);
            var getPixelPosition = maths.getPixelPositionFromTilePosition(tilePositionX, tilePositionY, config.gameConfig.borot.mapOffset.x, config.gameConfig.borot.mapOffset.y, config.gameConfig.borot.moveDistance.x, config.gameConfig.borot.moveDistance.y);
            Player.pixelPosition.x = getPixelPosition.x;
            Player.pixelPosition.y = getPixelPosition.y;
        }
        function init() {
            Player.drawSize = config.gameConfig.borot.size;
            Player.moveDistance = { x: config.gameConfig.borot.size.width, y: config.gameConfig.borot.size.height };
            PLACE(config.gameConfig.borot.startInArrayIndex.x, config.gameConfig.borot.startInArrayIndex.y, config.gameConfig.borot.startingDirection);
        }
        Player.init = init;
        function MOVE() {
            console.log(config.gameConfig.tiles.map[Player.tilePosition.y][Player.tilePosition.x]);
            // goes forward in it's current direction
            switch (Player.state.enumValue) {
                case Player.directionEnum.NORTH:
                    Player.tilePosition.y = Player.tilePosition.y - 1;
                    break;
                case Player.directionEnum.WEST:
                    Player.tilePosition.x = Player.tilePosition.x - 1;
                    break;
                case Player.directionEnum.SOUTH:
                    Player.tilePosition.y = Player.tilePosition.y + 1;
                    break;
                case Player.directionEnum.EAST:
                    Player.tilePosition.x = Player.tilePosition.x + 1;
                    break;
            }
            PLACE(Player.tilePosition.x, Player.tilePosition.y, Player.state.enumValue);
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
        }
        Player.RIGHT = RIGHT;
        function REPORT() {
            // message: i am in the x tile from the left of the island, and y tile from the bottom of the island, facing DIRECTION
        }
        Player.REPORT = REPORT;
        function PLACE(tilePositionX, tilePositionY, faceDirection) {
            face(faceDirection);
            Player.tilePosition.x = tilePositionX;
            Player.tilePosition.y = tilePositionY;
            setPixelPosition(tilePositionX, tilePositionY);
        }
        Player.PLACE = PLACE;
    })(Player = Logic.Player || (Logic.Player = {}));
})(Logic || (Logic = {}));
//# sourceMappingURL=player.js.map
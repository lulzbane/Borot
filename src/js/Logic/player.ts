module Logic.Player {
  import config = Config;
  import maths = Utils.Maths;

  export var directionEnum = {
    NORTH: 0,
    WEST: 1,
    SOUTH: 2,
    EAST: 3
  };

  export var tilePosition = { x: 0, y: 0 };
  export var pixelPosition = { x: 0, y: 0 };
  export var drawSize = { width: 0, height: 0 };
  export var moveDistance = { x: 0, y: 0 };
  export var state = { assetName: "", enumValue: -1 };

  function getStateFromEnum(facingEnum)
  {
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
    pixelPosition.x = getPixelPosition.x;
    pixelPosition.y = getPixelPosition.y;
  }

  export function init() {
    drawSize = config.gameConfig.borot.size;
    moveDistance = { x: config.gameConfig.borot.size.width, y: config.gameConfig.borot.size.height };
    PLACE(config.gameConfig.borot.startInArrayIndex.x, config.gameConfig.borot.startInArrayIndex.y, config.gameConfig.borot.startingDirection);
  }

  export function MOVE() {
    console.log(config.gameConfig.tiles.map[tilePosition.y][tilePosition.x]);
    // goes forward in it's current direction
    switch (state.enumValue) {
      case directionEnum.NORTH:
        tilePosition.y = tilePosition.y - 1;
        break;
      case directionEnum.WEST:
        tilePosition.x = tilePosition.x - 1;
        break;
      case directionEnum.SOUTH:
        tilePosition.y = tilePosition.y + 1;
        break;
      case directionEnum.EAST:
        tilePosition.x = tilePosition.x + 1;
        break;
    }

    PLACE(tilePosition.x, tilePosition.y, state.enumValue);
  }

  function face(direction) {
    state = getStateFromEnum(direction);
  }

  export function LEFT() {
    // rotates direction counterclockwise once
    if (state.enumValue === directionEnum.EAST) {
      face(directionEnum.NORTH);
    } else {
      face(state.enumValue + 1);
    }
  }

  export function RIGHT() {
    // rotates direction counterclockwise once
    if (state.enumValue === directionEnum.NORTH) {
      face(directionEnum.EAST);
    } else {
      face(state.enumValue - 1);
    }
  }

  export function REPORT() {
    // message: i am in the x tile from the left of the island, and y tile from the bottom of the island, facing DIRECTION
  }

  export function PLACE(tilePositionX, tilePositionY, faceDirection) {
    face(faceDirection);
    tilePosition.x = tilePositionX;
    tilePosition.y = tilePositionY;
    setPixelPosition(tilePositionX, tilePositionY);
  }


}
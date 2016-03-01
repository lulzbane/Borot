module Logic.Player {
  import config = Config;
  import maths = Utils.Maths;
  import text = Gfx.Text;

  export var directionEnum = {
    NORTH: 0,
    WEST: 1,
    SOUTH: 2,
    EAST: 3
  };

  export var isConfused = false;
  export var tilePosition = { x: 0, y: 0 };
  export var collisionMapPosition = { x: 0, y: 0 };
  export var pixelPosition = { x: 0, y: 0 };
  export var drawSize = { width: 0, height: 0 };
  export var moveDistance = { x: 0, y: 0 };
  export var state = { assetName: "", textName: "", enumValue: -1 };

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
    var getPixelPosition = maths.getPixelPositionFromTilePosition(tilePositionX, tilePositionY, config.gameConfig.borot.mapOffset.x, config.gameConfig.borot.mapOffset.y, config.gameConfig.grid.collisionTileDistance.x, config.gameConfig.grid.collisionTileDistance.y);
    pixelPosition.x = getPixelPosition.x;
    pixelPosition.y = getPixelPosition.y;
  }

  export function init() {
    drawSize = config.gameConfig.borot.size;
    collisionMapPosition = config.gameConfig.borot.collisionMapStart;
    moveDistance = { x: config.gameConfig.borot.size.width, y: config.gameConfig.borot.size.height };
    PLACE(config.gameConfig.borot.tilemapStart.x, config.gameConfig.borot.tilemapStart.y, config.gameConfig.borot.startingDirection);
  }

  export function MOVE() {
    if (checkCollision()) {
      // goes forward in it's current direction
      switch (state.enumValue) {
        case directionEnum.NORTH:
          tilePosition.y = tilePosition.y - 1;
          collisionMapPosition.y = collisionMapPosition.y - 1;
          break;
        case directionEnum.WEST:
          tilePosition.x = tilePosition.x - 1;
          collisionMapPosition.x = collisionMapPosition.x - 1;
          break;
        case directionEnum.SOUTH:
          tilePosition.y = tilePosition.y + 1;
          collisionMapPosition.y = collisionMapPosition.y + 1;
          break;
        case directionEnum.EAST:
          tilePosition.x = tilePosition.x + 1;
          collisionMapPosition.x = collisionMapPosition.x + 1;
          break;
      }
      PLACE(tilePosition.x, tilePosition.y, state.enumValue);
    }
    isConfused = false;
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
    isConfused = false;
  }

  export function RIGHT() {
    // rotates direction counterclockwise once
    if (state.enumValue === directionEnum.NORTH) {
      face(directionEnum.EAST);
    } else {
      face(state.enumValue - 1);
    }
    isConfused = false;
  }

  export function REPORT() {
    var message = "hello human! i am " + collisionMapPosition.x + " meters from the EAST of the island, " + ((config.gameConfig.grid.collisionMap.length - 1) - collisionMapPosition.y) + " meters from the SOUTH and i'm facing " + state.textName.toUpperCase();
    text.showMessage(message);
    isConfused = false;
  }

  function getRandomTilePosition() {
    return {
      x: maths.getRandomIntInclusive(0, config.gameConfig.grid.collisionMap.length - 1),
      y: maths.getRandomIntInclusive(0, config.gameConfig.grid.collisionMap[0].length - 1)
    };
  }

  function getRandomDirection() {
    return maths.getRandomIntInclusive(0, 3);
  }

  export function CONFUSE() {
    isConfused = true;
    var showConfusion = () => {
      var message = "bzzt!! bzzzt!! blip! blip! bzzzzz... already at location... instructions unclear... STANDBY!";
      text.showMessage(message);
      var confusionAction = () => {
        if (isConfused) {
          var newPosition = getRandomTilePosition();
          var newDirection = getRandomDirection();
          face(newDirection);
          PLACE(newPosition.x, newPosition.y, state.enumValue);
          message = "CONFUSION PERSISTING... moving to " + newPosition.x + " from EAST end, " + ((config.gameConfig.grid.collisionMap.length - 1) - newPosition.y) + " from SOUTH... heading " + state.textName.toUpperCase() + "... STANDBY!";
          text.showMessage(message);
          setTimeout(confusionAction, config.gameConfig.borot.confusionDelay);
        }
      }
      setTimeout(confusionAction, config.gameConfig.borot.confusionDelay);
    };
    setTimeout(showConfusion, 100);
  }

  export function PLACE(tilePositionX, tilePositionY, faceDirection) {
    face(faceDirection);
    tilePosition.x = tilePositionX;
    tilePosition.y = tilePositionY;
    collisionMapPosition.x = tilePositionX;
    collisionMapPosition.y = tilePositionY;
    setPixelPosition(tilePositionX, tilePositionY);
  }

  export function checkCollision() {
    var canMove = false;
    switch (state.enumValue) {
      case directionEnum.NORTH:
        if (collisionMapPosition.y > 0)
        {
          canMove = true;
        }
        break;
      case directionEnum.WEST:
        if (collisionMapPosition.x > 0) {
          canMove = true;
        }
        break;
      case directionEnum.SOUTH:
        if (collisionMapPosition.y < config.gameConfig.grid.collisionMap.length -1) {
          canMove = true;
        }
        break;
      case directionEnum.EAST:
        if (collisionMapPosition.x < config.gameConfig.grid.collisionMap[collisionMapPosition.y].length -1) {
          canMove = true;
        }
        break;
    }
    if (!canMove) {
      text.showMessage("PC LOAD LETTER... does not compute... this island is my home");
    } else {
      text.hideMessage();
    }
    return canMove;
  }
}
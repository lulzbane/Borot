module Utils.Maths {
  import config = Config;

  export function getPixelPositionFromTilePosition(tilePositionX, tilePositionY, offsetX, offsetY, tileWidth, tileHeight) {
    var pixelPosition = { x: 0, y: 0 };
    pixelPosition.x = offsetX + (tilePositionX * tileWidth);
    pixelPosition.y = offsetY + (tilePositionY * tileHeight);
    return pixelPosition;
  }
}
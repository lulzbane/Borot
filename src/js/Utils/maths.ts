module Utils.Maths {
  import config = Config;

  export function getPixelPositionFromTilePosition(tilePositionX, tilePositionY, offsetX, offsetY, tileWidth, tileHeight) {
    var pixelPosition = { x: 0, y: 0 };
    pixelPosition.x = offsetX + (tilePositionX * tileWidth);
    pixelPosition.y = offsetY + (tilePositionY * tileHeight);
    return pixelPosition;
  }

  export function isInPolygon(vertices, vertXArr, vertYArr, xCoord, yCoord) {
    var isInsidePolygon = false;
    var i, j;
    for (i = 0, j = vertices - 1; i < vertices; j = i++) {
      if (((vertYArr[i] > yCoord) !== (vertYArr[j] > yCoord)) && (xCoord < (vertXArr[j] - vertXArr[i]) * (yCoord - vertYArr[i]) / (vertYArr[j] - vertYArr[i]) + vertXArr[i])) {
        isInsidePolygon = !isInsidePolygon;
      }
    }
    return isInsidePolygon;
  }

  export function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  export function coordinatesMatch(coords, otherCoords) {
    return (coords.x === otherCoords.x) && (coords.y === otherCoords.y);
  }
}
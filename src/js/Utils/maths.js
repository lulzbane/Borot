var Utils;
(function (Utils) {
    var Maths;
    (function (Maths) {
        function getPixelPositionFromTilePosition(tilePositionX, tilePositionY, offsetX, offsetY, tileWidth, tileHeight) {
            var pixelPosition = { x: 0, y: 0 };
            pixelPosition.x = offsetX + (tilePositionX * tileWidth);
            pixelPosition.y = offsetY + (tilePositionY * tileHeight);
            return pixelPosition;
        }
        Maths.getPixelPositionFromTilePosition = getPixelPositionFromTilePosition;
        function isInPolygon(vertices, vertXArr, vertYArr, xCoord, yCoord) {
            var isInsidePolygon = false;
            var i, j;
            for (i = 0, j = vertices - 1; i < vertices; j = i++) {
                if (((vertYArr[i] > yCoord) !== (vertYArr[j] > yCoord)) && (xCoord < (vertXArr[j] - vertXArr[i]) * (yCoord - vertYArr[i]) / (vertYArr[j] - vertYArr[i]) + vertXArr[i])) {
                    isInsidePolygon = !isInsidePolygon;
                }
            }
            return isInsidePolygon;
        }
        Maths.isInPolygon = isInPolygon;
        function getRandomIntInclusive(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        Maths.getRandomIntInclusive = getRandomIntInclusive;
        function coordinatesMatch(coords, otherCoords) {
            return (coords.x === otherCoords.x) && (coords.y === otherCoords.y);
        }
        Maths.coordinatesMatch = coordinatesMatch;
    })(Maths = Utils.Maths || (Utils.Maths = {}));
})(Utils || (Utils = {}));
//# sourceMappingURL=maths.js.map
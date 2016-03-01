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
    })(Maths = Utils.Maths || (Utils.Maths = {}));
})(Utils || (Utils = {}));
//# sourceMappingURL=maths.js.map
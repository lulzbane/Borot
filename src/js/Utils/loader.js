var Utils;
(function (Utils) {
    var Loader;
    (function (Loader) {
        var config = Config;
        Loader.assetsLoaded = {
            tiles: {
                assets: [],
                loaded: false
            },
            static: {
                assets: [],
                loaded: false
            }
        };
        function loadImages(imagePathArray, imageLoadedArray, callback, callbackObj) {
            var graphicsLoaded = 0;
            for (var i = 0; i < imagePathArray.length; i++) {
                imageLoadedArray[i] = {};
                imageLoadedArray[i].name = imagePathArray[i].name;
                imageLoadedArray[i].image = new Image();
                imageLoadedArray[i].image.src = imagePathArray[i].path;
                imageLoadedArray[i].image.onload = function () {
                    // Once the image is loaded increment the loaded graphics count and check if all images are ready.
                    graphicsLoaded++;
                    if (graphicsLoaded === imagePathArray.length) {
                        callback(callbackObj);
                    }
                };
            }
        }
        Loader.loadImages = loadImages;
        function getLoadedAsset(assetList, assetName) {
            if (assetName && assetName.length > 0) {
                for (var i = 0; i < assetList.length; i++) {
                    if (assetList[i].name === assetName) {
                        return assetList[i].image;
                    }
                }
            }
            return null;
        }
        Loader.getLoadedAsset = getLoadedAsset;
        function getTile(tileMapNumber) {
            var tileName = undefined;
            for (var mapNum in config.gameConfig.tiles.index) {
                if (config.gameConfig.tiles.index.hasOwnProperty(mapNum)) {
                    if (tileMapNumber.toString() === mapNum) {
                        tileName = config.gameConfig.tiles.index[mapNum];
                    }
                }
            }
            return getLoadedAsset(Loader.assetsLoaded.tiles.assets, tileName);
        }
        Loader.getTile = getTile;
        ;
    })(Loader = Utils.Loader || (Utils.Loader = {}));
})(Utils || (Utils = {}));
//# sourceMappingURL=loader.js.map
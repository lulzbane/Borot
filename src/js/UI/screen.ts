module UI.Screen {
  import config = Config;
  import Loader = Utils.Loader;

  export function drawStartingForeground(callback) {
    var canvas = <HTMLCanvasElement>document.getElementById('foreground');
    var ctx = canvas.getContext('2d');
    var borotOffsetX = config.gameConfig.borot.mapOffset.x + (config.gameConfig.borot.startInArrayIndex.x * config.gameConfig.tiles.tileDimensions.width);
    var borotOffsetY = config.gameConfig.borot.mapOffset.y + (config.gameConfig.borot.startInArrayIndex.y * (config.gameConfig.tiles.tileDimensions.height / 2));
    var tutorial = Loader.getLoadedAsset(Loader.assetsLoaded.static.assets, "tutorial");
    if (tutorial) {
      ctx.drawImage(tutorial, borotOffsetX + config.gameConfig.tutorial.offsetFromBorot.x, borotOffsetY + config.gameConfig.tutorial.offsetFromBorot.y);
    }
    var borot = Loader.getLoadedAsset(Loader.assetsLoaded.static.assets, "borot_static");
    if (borot) {
      ctx.drawImage(borot, borotOffsetX, borotOffsetY, config.gameConfig.borot.size.width, config.gameConfig.borot.size.height);
    }
    Loader.assetsLoaded.static.loaded = true;
    callback();
  }

  export function drawBackground(callback) {
    var canvas = <HTMLCanvasElement>document.getElementById('background');
    var ctx = canvas.getContext('2d');   
    // loop through our map and draw out the image represented by the number.
    for (var i = 0; i < config.gameConfig.tiles.map.length; i++) {
      for (var j = 0; j < config.gameConfig.tiles.map[i].length; j++) {
        var tile = Loader.getTile(config.gameConfig.tiles.map[i][j]);
        if (tile) {
          ctx.drawImage(tile, (i - j) * config.gameConfig.tiles.tileDimensions.width + config.gameConfig.tiles.mapOffset.x, (i + j) * config.gameConfig.tiles.tileDimensions.height / 2 + config.gameConfig.tiles.mapOffset.y);
        }
      }
    }
    Loader.assetsLoaded.tiles.loaded = true;
    callback();
  }
}
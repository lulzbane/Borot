module Gfx.Screen {
  import config = Config;
  import loader = Utils.Loader;
  import player = Logic.Player;
  import maths = Utils.Maths;
  import input = Logic.Input;

  var backgroundCanvas;
  var foregroundCanvas;
  var backgroundContext;
  var foregroundContext;

  export function drawTutorial() {
    var getPixelPosition = maths.getPixelPositionFromTilePosition(config.gameConfig.tutorial.tilePosition.x, config.gameConfig.tutorial.tilePosition.y, config.gameConfig.tutorial.offsetFromTilePosition.x, config.gameConfig.tutorial.offsetFromTilePosition.y, config.gameConfig.tiles.tileDimensions.width * 2, config.gameConfig.tiles.tileDimensions.height);
    var tutorial = loader.getLoadedAsset(loader.assetsLoaded.static.assets, "tutorial");
    if (tutorial) {
      foregroundContext.drawImage(tutorial, getPixelPosition.x, getPixelPosition.y);
    }
  }

  export function drawBorot() {
    var borotImg = loader.getLoadedAsset(loader.assetsLoaded.static.assets, player.state.assetName);
    if (borotImg) {
      foregroundContext.drawImage(borotImg, player.pixelPosition.x, player.pixelPosition.y, player.drawSize.width, player.drawSize.height);
    }
  }

  export function render() {
    if (!foregroundContext) {
      if (!foregroundCanvas) {
        foregroundCanvas = <HTMLCanvasElement>document.getElementById('foreground');
      }
      foregroundContext = foregroundCanvas.getContext('2d');
    }
    foregroundContext.clearRect(0, 0, foregroundCanvas.width, foregroundCanvas.height);
    if (!input.playerInputStarted) {
      drawTutorial();
    }
    drawBorot();
  }

  export function drawBackground() {
    if (!backgroundContext) {
      if (!backgroundCanvas) {
        backgroundCanvas = <HTMLCanvasElement>document.getElementById('background');
      }
      backgroundContext = backgroundCanvas.getContext('2d');  
    }

    var width = config.gameConfig.tiles.tileDimensions.width * 2;
    var height = config.gameConfig.tiles.tileDimensions.height * 2;
    var mapOffsetX = config.gameConfig.tiles.mapOffset.x;
    var mapOffsetY = config.gameConfig.tiles.mapOffset.y;

    for (var y = 0; y < config.gameConfig.tiles.map.length; y++) {
      for (var x = 0; x < config.gameConfig.tiles.map[y].length; x++) {
        var xOffset = 0;
        if (y % 2 !== 0) {
          xOffset = width / 2;
        }

        var tilePosX = (x * width) + xOffset;
        var tilePosY = (y * height) / 2;

        var tileType = config.gameConfig.tiles.map[y][x];
        if (tileType === 2) {
          tileType = 1;
        }

        var tile = loader.getTile(tileType);
        if (tile) {
          backgroundContext.drawImage(tile, Math.round(tilePosX) + mapOffsetX, Math.round(tilePosY / 2) + mapOffsetY, width, height);
        }
      }
    }
  }
}
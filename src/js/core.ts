module Core {
  import Loader = Utils.Loader;
  import config = Config;
  import screen = UI.Screen;

  function start() {
    console.log('1');
  }

  function setup() {
    if (Loader.assetsLoaded.tiles.loaded && Loader.assetsLoaded.static.loaded) {
      start();  
    }
  }

  export function init() {
    window.removeEventListener('load', init);
    Loader.loadImages(config.gameConfig.assets.tiles, Loader.assetsLoaded.tiles.assets, screen.drawBackground, setup);
    Loader.loadImages(config.gameConfig.assets.static, Loader.assetsLoaded.static.assets, screen.drawStartingForeground, setup);
  }

  window.addEventListener('load', init, false);
}
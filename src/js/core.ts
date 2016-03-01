module Core {
  import loader = Utils.Loader;
  import config = Config;
  import screen = Gfx.Screen;
  import grid = Gfx.Grid;
  import input = Logic.Input;
  import player = Logic.Player;
  import loop = Logic.Loop;

  function start() {
    loop.start();
  }

  function setup() {
    if (loader.assetsLoaded.tiles.loaded && loader.assetsLoaded.static.loaded) {
      screen.drawBackground();
      grid.init();
      input.init();
      start();  
    }
  }

  export function init() {
    window.removeEventListener('load', init);
    player.init(); 
    loader.loadImages(config.gameConfig.assets.tiles, loader.assetsLoaded.tiles.assets, () => { loader.assetsLoaded.tiles.loaded = true; setup(); });
    loader.loadImages(config.gameConfig.assets.static, loader.assetsLoaded.static.assets, () => { loader.assetsLoaded.static.loaded = true; setup();});
  }

  window.addEventListener('load', init, false);
}
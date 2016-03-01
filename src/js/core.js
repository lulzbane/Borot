var Core;
(function (Core) {
    var loader = Utils.Loader;
    var config = Config;
    var screen = Gfx.Screen;
    var grid = Gfx.Grid;
    var input = Logic.Input;
    var player = Logic.Player;
    var loop = Logic.Loop;
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
    function init() {
        window.removeEventListener('load', init);
        player.init();
        loader.loadImages(config.gameConfig.assets.tiles, loader.assetsLoaded.tiles.assets, function () { loader.assetsLoaded.tiles.loaded = true; setup(); });
        loader.loadImages(config.gameConfig.assets.static, loader.assetsLoaded.static.assets, function () { loader.assetsLoaded.static.loaded = true; setup(); });
    }
    Core.init = init;
    window.addEventListener('load', init, false);
})(Core || (Core = {}));
//# sourceMappingURL=core.js.map
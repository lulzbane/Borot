var Core;
(function (Core) {
    var Loader = Utils.Loader;
    var config = Config;
    var screen = UI.Screen;
    function start() {
        console.log('1');
    }
    function setup() {
        if (Loader.assetsLoaded.tiles.loaded && Loader.assetsLoaded.static.loaded) {
            start();
        }
    }
    function init() {
        window.removeEventListener('load', init);
        Loader.loadImages(config.gameConfig.assets.tiles, Loader.assetsLoaded.tiles.assets, screen.drawBackground, setup);
        Loader.loadImages(config.gameConfig.assets.static, Loader.assetsLoaded.static.assets, screen.drawStartingForeground, setup);
    }
    Core.init = init;
    window.addEventListener('load', init, false);
})(Core || (Core = {}));
//# sourceMappingURL=core.js.map
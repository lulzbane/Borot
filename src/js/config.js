var Config;
(function (Config) {
    Config.gameConfig = {
        assets: {
            tiles: [{ name: "grass_block", path: "img/grasstile1.png" }],
            static: [{ name: "borot_static", path: "img/borot-static.png" }, { name: "tutorial", path: "img/tutorial.png" }]
        },
        borot: {
            mapOffset: {
                x: 44,
                y: 77
            },
            startInArrayIndex: {
                x: 4,
                y: 4
            },
            size: {
                width: 70,
                height: 70
            }
        },
        tiles: {
            index: {
                0: "",
                1: "grass_block"
            },
            map: [
                [0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0]
            ],
            mapOffset: {
                x: 240,
                y: -40
            },
            tileDimensions: {
                width: 54,
                height: 63
            }
        },
        tutorial: {
            offsetFromBorot: {
                x: -106,
                y: -78
            }
        }
    };
})(Config || (Config = {}));
//# sourceMappingURL=config.js.map
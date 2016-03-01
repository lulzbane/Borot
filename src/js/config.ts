module Config {
  export var gameConfig = {
    assets: {
      tiles: [{ name: "grass_block", path: "img/grasstile1.png" }],
      static: [{ name: "borot_north", path: "img/borot-north.png" }, { name: "borot_west", path: "img/borot-west.png" }, { name: "borot_south", path: "img/borot-south.png" }, { name: "borot_east", path: "img/borot-east.png" }, { name: "borot_static", path: "img/borot-static.png" }, { name: "tutorial", path: "img/tutorial.png" }]
    },
    message: {
      domId: "message",
      displayTime: 4000
    },
    input: {
      controls: {
        119: "MOVE",
        97: "LEFT",
        100: "RIGHT",
        32: "REPORT"
      }
    },
    borot: {
      confusionDelay: 5000,
      mapOffset: {
        x: 81,
        y: 70
      },
      tilemapStart: {
        x: 0,
        y: 4
      },
      collisionMapStart: {
        x: 0,
        y: 4
      },
      size: {
        width: 70,
        height: 70
      },
      startingDirection: 0,
      state: {
        north: {
          assetName: "borot_north",
          textName: "north",
          enumValue: 0
        },
        west: {
          assetName: "borot_west",
          textName: "west",
          enumValue: 1
        },
        south: {
          assetName: "borot_south",
          textName: "south",
          enumValue: 2
        },
        east: {
          assetName: "borot_east",
          textName: "east",
          enumValue: 3
        }
      }
    },
    tiles: {
      index: {
        0: "",
        1: "grass_block"
      },
      map: [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1, 1]
      ],
      mapOffset: {
        x : 62,
        y : 85
      },
      tileDimensions: {
        width: 50,
        height: 63
      }
    },
    grid: {
      collisionMap: [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
      ],
      collisionTileDistance: {
        x: 100,
        y: 63
      },
      clickableArea: {
        top: { x: 45, y: 0 },
        left: { x: 0, y: 28 },
        bottom: { x: 45, y: 55 },
        right: { x: 88, y: 28 },
        padding: { x: 5, y: 4 }
      },
      gridTooltipColor: {
        defaultRGBA: "200, 200, 200, 0.6",
        activeRGBA: "255, 255, 255, 0.6"
      }
    },
    tutorial: {
      tilePosition: {
        x: 2,
        y: 2
      },
      offsetFromTilePosition: {
        x: -30,
        y: -15
      }
    }
  };
}
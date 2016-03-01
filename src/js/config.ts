module Config {
  export var gameConfig = {
    assets: {
      tiles: [{ name: "grass_block", path: "img/grasstile1.png" }],
      static: [{ name: "borot_north", path: "img/borot-north.png" }, { name: "borot_west", path: "img/borot-west.png" }, { name: "borot_south", path: "img/borot-south.png" }, { name: "borot_east", path: "img/borot-east.png" }, { name: "borot_static", path: "img/borot-static.png" }, { name: "tutorial", path: "img/tutorial.png" }]
    },
    input: {
      controls: {
        119: "MOVE",
        97: "LEFT",
        100: "RIGHT"
      }
    },
    borot: {
      mapOffset: {
        x: 45,
        y: 70
      },
      startInArrayIndex: {
        x: 0,
        y: 4
      },
      size: {
        width: 70,
        height: 70
      },
      moveDistance: {
        x: 108,
        y: 63
      },
      startingDirection: 0,
      state: {
        north: {
          assetName: "borot_north",
          enumValue: 0
        },
        west: {
          assetName: "borot_west",
          enumValue: 1
        },
        south: {
          assetName: "borot_south",
          enumValue: 2
        },
        east: {
          assetName: "borot_east",
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
        [0, 2, 2, 2, 2],
        [1, 1, 1, 1, 1],
        [0, 2, 2, 2, 2],
        [1, 1, 1, 1, 1],
        [0, 2, 2, 2, 2],
        [1, 1, 1, 1, 1],
        [0, 2, 2, 2, 2],
        [1, 1, 1, 1, 1]
      ],
     /* map: [
        [0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0]
      ],*/
      mapOffset: {
        x : 240,
        y : -40
      },
      tileDimensions: {
        width: 50,
        height: 63
      }
    },
    tutorial: {
      tilePosition: {
        x: 2,
        y: 2
      },
      offsetFromTilePosition: {
        x: -62,
        y: 10
      }
    }
  };
}
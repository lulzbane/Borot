var Gfx;
(function (Gfx) {
    var Grid;
    (function (Grid) {
        var config = Config;
        var maths = Utils.Maths;
        var player = Logic.Player;
        var gridCanvas;
        var gridContext;
        var grid = [];
        var quadrantEnum = {
            TOP: 0,
            LEFT: 1,
            BOTTOM: 2,
            RIGHT: 3
        };
        function getQuadrantArea(shapeObj, quadrant) {
            var fullWidth = config.gameConfig.grid.collisionTileDistance.x - (config.gameConfig.grid.clickableArea.padding.x * 2);
            var fullHeight = config.gameConfig.grid.collisionTileDistance.y - (config.gameConfig.grid.clickableArea.padding.y * 2);
            var centerPoint = {
                x: shapeObj.top.x,
                y: shapeObj.left.y
            };
            var midPoints = {
                NW: { x: Math.round(shapeObj.top.x - (fullWidth / 4)), y: Math.round(shapeObj.top.y + (fullHeight / 4)) },
                SW: { x: Math.round(shapeObj.top.x - (fullWidth / 4)), y: Math.round(shapeObj.left.y + (fullHeight / 4)) },
                SE: { x: Math.round(shapeObj.top.x + (fullWidth / 4)), y: Math.round(shapeObj.left.y + (fullHeight / 4)) },
                NE: { x: Math.round(shapeObj.top.x + (fullWidth / 4)), y: Math.round(shapeObj.top.y + (fullHeight / 4)) }
            };
            var area;
            switch (quadrant) {
                case quadrantEnum.TOP:
                    area = {
                        top: { x: shapeObj.top.x, y: shapeObj.top.y },
                        left: { x: midPoints.NW.x, y: midPoints.NW.y },
                        bottom: { x: centerPoint.x, y: centerPoint.y },
                        right: { x: midPoints.NE.x, y: midPoints.NE.y }
                    };
                    break;
                case quadrantEnum.LEFT:
                    area = {
                        top: { x: midPoints.NW.x, y: midPoints.NW.y },
                        left: { x: shapeObj.left.x, y: shapeObj.left.y },
                        bottom: { x: midPoints.SW.x, y: midPoints.SW.y },
                        right: { x: centerPoint.x, y: centerPoint.y }
                    };
                    break;
                case quadrantEnum.BOTTOM:
                    area = {
                        top: { x: centerPoint.x, y: centerPoint.y },
                        left: { x: midPoints.SW.x, y: midPoints.SW.y },
                        bottom: { x: shapeObj.bottom.x, y: shapeObj.bottom.y },
                        right: { x: midPoints.SE.x, y: midPoints.SE.y }
                    };
                    break;
                case quadrantEnum.RIGHT:
                    area = {
                        top: { x: midPoints.NE.x, y: midPoints.NE.y },
                        left: { x: centerPoint.x, y: centerPoint.y },
                        bottom: { x: midPoints.SE.x, y: midPoints.SE.y },
                        right: { x: shapeObj.right.x, y: shapeObj.right.y }
                    };
                    break;
            }
            return area;
        }
        function isInArea(area, coordinates) {
            var xValues = [];
            var yValues = [];
            for (var vert in area) {
                if (area.hasOwnProperty(vert)) {
                    xValues.push(area[vert].x);
                    yValues.push(area[vert].y);
                }
            }
            return maths.isInPolygon(4, xValues, yValues, coordinates.x, coordinates.y);
        }
        function getQuadrants(shapeObj, coordinates) {
            var quadrants = [];
            for (var quadrant in quadrantEnum) {
                if (quadrantEnum.hasOwnProperty(quadrant)) {
                    var area = getQuadrantArea(shapeObj, quadrantEnum[quadrant]);
                    quadrants.push({ area: area, quadrant: quadrantEnum[quadrant], active: isInArea(area, coordinates) });
                }
            }
            return quadrants;
        }
        function drawArea(areaObj, rgba) {
            gridContext.fillStyle = "rgba(" + rgba + ")";
            gridContext.beginPath();
            gridContext.moveTo(areaObj.top.x, areaObj.top.y);
            gridContext.lineTo(areaObj.left.x, areaObj.left.y);
            gridContext.lineTo(areaObj.bottom.x, areaObj.bottom.y);
            gridContext.lineTo(areaObj.right.x, areaObj.right.y);
            gridContext.lineTo(areaObj.top.x, areaObj.top.y);
            gridContext.fill();
        }
        function drawTooltip(quadrants) {
            for (var x = 0; x < quadrants.length; x++) {
                var color = config.gameConfig.grid.gridTooltipColor.defaultRGBA;
                if (quadrants[x].active) {
                    color = config.gameConfig.grid.gridTooltipColor.activeRGBA;
                }
                drawArea(quadrants[x].area, color);
            }
        }
        function init() {
            if (!gridContext) {
                if (!gridCanvas) {
                    gridCanvas = document.getElementById('grid');
                }
                gridContext = gridCanvas.getContext('2d');
            }
            var clickShape = config.gameConfig.grid.clickableArea;
            for (var y = 0; y < config.gameConfig.grid.collisionMap.length; y++) {
                var row = [];
                for (var x = 0; x < config.gameConfig.grid.collisionMap[y].length; x++) {
                    var left = 0;
                    var right = 0;
                    var top = 0;
                    var bottom = 0;
                    var horizontalCenter = 0;
                    var verticalCenter = 0;
                    if (config.gameConfig.grid.collisionMap[y][x] === 1) {
                        var topLeft = maths.getPixelPositionFromTilePosition(y, x, config.gameConfig.tiles.mapOffset.x + clickShape.padding.x, config.gameConfig.tiles.mapOffset.y + clickShape.padding.y, config.gameConfig.grid.collisionTileDistance.x, config.gameConfig.grid.collisionTileDistance.y);
                        left = topLeft.x;
                        right = topLeft.x + clickShape.right.x;
                        top = topLeft.y;
                        bottom = topLeft.y + clickShape.bottom.y;
                        horizontalCenter = topLeft.x + clickShape.top.x;
                        verticalCenter = topLeft.y + clickShape.left.y;
                    }
                    var item = {
                        top: { x: Math.round(horizontalCenter), y: Math.round(top) },
                        left: { x: Math.round(left), y: Math.round(verticalCenter) },
                        bottom: { x: Math.round(horizontalCenter), y: Math.round(bottom) },
                        right: { x: Math.round(right), y: Math.round(verticalCenter) }
                    };
                    row.push(item);
                }
                grid.push(row);
            }
        }
        Grid.init = init;
        function getGridItem(coordinates) {
            for (var y = 0; y < grid.length; y++) {
                for (var x = 0; x < grid[y].length; x++) {
                    var item = grid[y][x];
                    if (isInArea(item, coordinates)) {
                        return { x: y, y: x };
                    }
                }
            }
            return null;
        }
        function getTilePositionFromGrid(gridItem) {
            return {
                x: gridItem.x,
                y: gridItem.y
            };
        }
        function getDirectionFromActiveQuadrant(quadrants) {
            for (var x = 0; x < quadrants.length; x++) {
                if (quadrants[x].active) {
                    return quadrants[x].quadrant;
                }
            }
            return -1;
        }
        function gridClicked(quadrants, gridItem) {
            if (!maths.coordinatesMatch(gridItem, player.tilePosition)) {
                var tilePosition = getTilePositionFromGrid(gridItem);
                var direction = getDirectionFromActiveQuadrant(quadrants);
                player.PLACE(tilePosition.x, tilePosition.y, direction);
                player.isConfused = false;
            }
            else {
                player.CONFUSE();
            }
        }
        function mouseInputReceived(mousePosition, isClick) {
            gridContext.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
            var gridItem = getGridItem(mousePosition);
            if (gridItem) {
                var quadrants = getQuadrants(grid[gridItem.x][gridItem.y], mousePosition);
                if (isClick) {
                    gridClicked(quadrants, gridItem);
                    return true;
                }
                else {
                    drawTooltip(quadrants);
                }
            }
            return false;
        }
        Grid.mouseInputReceived = mouseInputReceived;
    })(Grid = Gfx.Grid || (Gfx.Grid = {}));
})(Gfx || (Gfx = {}));
//# sourceMappingURL=grid.js.map
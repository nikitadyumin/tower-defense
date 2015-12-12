/**
 * Created by ndyumin on 12.12.2015.
 */
define(['../util', './dict'], function (util, dict) {
    'use strict';

    function getAtPos(grid, x, y) {
        return grid[y][x];
    }

    function hasBuildingAt(buildings, position) {
        const isSamePosition = (x) => util.eq(x.position, position);
        return buildings.some(isSamePosition);
    }

    return function (buildings, map, input) {

        if (getAtPos(map.grid, ...input) === dict.TERRAIN.TRAVERSABLE
            && !hasBuildingAt(buildings, input)) {
            return buildings.concat({
                position: input,
                type: dict.TERRAIN.BUILDING
            });
        }

        return buildings;
    }
});
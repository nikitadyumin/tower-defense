/**
 * Created by ndyumin on 06.12.2015.
 */
define(function() {
    'use strict';

    const TERRAIN = {
        TRAVERSABLE: 1,
        SPAWN: 2,
        GOAL: 3,
        NOT_TRAVERSABLE: 5
    };

    const GRID = {
        CELL_SIZE: 30
    };

    return {
        GRID: GRID,
        TERRAIN: TERRAIN
    };
});
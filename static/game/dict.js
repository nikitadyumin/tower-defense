/**
 * Created by ndyumin on 06.12.2015.
 */
define(function() {
    'use strict';

    const TERRAIN = {
        TRAVERSABLE: 1,
        SPAWN: 2,
        GOAL: 3,
        BUILDING: 4,
        NOT_TRAVERSABLE: 5
    };

    const COLOR = {
        BACKGROUND: 0,
        BUILDING: 10,
        ENEMY: 20
    };

    const GRID = {
        CELL_SIZE: 30
    };

    const VIEWPORT = {
        RATIO: 1.25,
        SELECTOR: 'canvas#game'
    };

    return {
        COLOR: COLOR,
        VIEWPORT: VIEWPORT,
        GRID: GRID,
        TERRAIN: TERRAIN
    };
});
/**
 * Created by ndyumin on 06.12.2015.
 */
define(['baconjs', './dict'], function (Bacon, dict) {
    'use strict';

    const COLUMN_COUNT = 40;
    const ROW_COUNT = 30;

    function array(n, map) {
        return Array.from({length: n}, map);
    }

    function generateLine() {
        return array(COLUMN_COUNT, () =>
            Math.random() < 0.7
                ? dict.TERRAIN.TRAVERSABLE
                : dict.TERRAIN.NOT_TRAVERSABLE);
    }

    function generateMap() {
        const grid = array(ROW_COUNT, generateLine);

        grid[10][2] = dict.TERRAIN.SPAWN;
        grid[20][2] = dict.TERRAIN.SPAWN;
        grid[28][38] = dict.TERRAIN.GOAL;

        return Bacon.constant({
            spawns: [[2, 10], [2, 20]],
            tower: [38, 28],
            health: 10000,
            waves: [[1000, 5], [5000, 10], [10000, 15]],
            grid: grid
        });
    }

    return generateMap;
});
/**
 * Created by ndyumin on 06.12.2015.
 */
define(['bacon', './dict'], function (Bacon, dict) {
    'use strict';

    function generateLine() {
        const line = [];
        for (let j = 0; j < 40; j += 1) {
            line.push(Math.random() < 0.7 ? dict.TERRAIN.TRAVERSABLE : dict.TERRAIN.NOT_TRAVERSABLE);
        }
        return line;
    }

    function generateMap() {
        const grid = [];
        for (let i = 0; i < 30; i += 1) {
            grid.push(generateLine());
        }

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
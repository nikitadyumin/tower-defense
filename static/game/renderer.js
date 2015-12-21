/**
 * Created by ndyumin on 06.12.2015.
 */
define(['jquery', '../util/canvas', './dict'], function ($, canvas, dict) {
    'use strict';
    return function getRenderer(sel) {
        const cellSize = dict.GRID.CELL_SIZE;
        const cv = canvas(document.querySelector(sel), cellSize);

        function getColor(c) {
            const colors = {};
            colors[dict.TERRAIN.TRAVERSABLE] = [154, 175, 183]; // #9aafb7
            colors[dict.TERRAIN.NOT_TRAVERSABLE] = [43, 59, 117]; // #2b3b75
            colors[dict.TERRAIN.SPAWN] = [113, 129, 178]; // #7181b2
            colors[dict.TERRAIN.GOAL] = [73, 104, 21]; // #496815
            return colors[c] || [0, 0, 0];
        }

        return function render(map, buildings, enemies) {
            cv.clean([0, 0, 0]);
            map.grid.forEach((line, y) =>
                line.forEach((cell, x) => {
                    if (cell === dict.TERRAIN.NOT_TRAVERSABLE) {
                        cv.drawCell(cellSize * x, cellSize * y, getColor(cell));
                    } else {
                        cv.drawSquare(x, y, getColor(cell));
                    }
                }));

            enemies.items.forEach(enemy => {
                cv.drawSquare(...enemy.position, [142, 160, 82]); //#8ea052
            });

            buildings.forEach(building => {
                cv.drawSquare(...building.position, [160, 82, 142]); //#a0528e
            });
        };
    };
});
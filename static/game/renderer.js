/**
 * Created by ndyumin on 06.12.2015.
 */
define(['jquery', './dict'], function ($, dict) {
    'use strict';
    return function getRenderer(sel) {
        const canvas = document.querySelector(sel);
        const ctx = canvas.getContext("2d");
        const $canvas = $(sel);
        const width = $canvas.width();
        const height = $canvas.height();
        const cellSize = 20;

        function getColor(c) {
            const colors = {};
            colors[dict.TERRAIN.TRAVERSABLE] = 'green';
            colors[dict.TERRAIN.NOT_TRAVERSABLE] = 'maroon';
            colors[dict.TERRAIN.SPAWN] = 'black';
            return colors[c] || 'white';
        }

        function clean(ctx) {
            ctx.fillStyle = getColor();
            ctx.fillRect(0, 0, width, height);
        }

        return function render(state) {
            const map = state.map;

            clean(ctx);
            map.grid.forEach((line, y) =>
                line.forEach((cell, x) => {
                    ctx.fillStyle = getColor(cell);
                    ctx.fillRect(cellSize * x, cellSize * y, cellSize, cellSize);
                }));

            state.enemies.forEach(enemy => {
                const x = enemy.position[0];
                const y = enemy.position[1];
                ctx.fillStyle = 'red';
                ctx.fillRect(cellSize * x, cellSize * y, cellSize, cellSize);
            })
        };
    };
});
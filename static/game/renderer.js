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
        const cellSize = dict.GRID.CELL_SIZE;

        //todo move to color module
        function toRgbString(rgb) {
            return `rgb(${rgb})`;
        }
        function shiftColor(rgb, v) {
            return rgb.map(x=>x+v);
        }

        function drawCell (x, y, color) {
            ctx.fillStyle = toRgbString(color);
            ctx.fillRect(x, y, cellSize, cellSize);

            ctx.fillStyle = toRgbString(shiftColor(color, 20));
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + cellSize);
            ctx.lineTo(x + cellSize, y);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = toRgbString(shiftColor(color, 10));
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + cellSize);
            ctx.lineTo(x + cellSize / 2, y + cellSize / 2);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle =  toRgbString(shiftColor(color, -10));
            ctx.beginPath();
            ctx.moveTo(x + cellSize, y + cellSize);
            ctx.lineTo(x, y + cellSize);
            ctx.lineTo(x + cellSize / 2, y + cellSize / 2);
            ctx.closePath();
            ctx.fill();
        }
        
        function getColor(c) {
            const colors = {};
            colors[dict.TERRAIN.TRAVERSABLE] = [154, 175, 183]; //'#9aafb7';
            colors[dict.TERRAIN.NOT_TRAVERSABLE] = [43, 59, 117]; //'#2b3b75';
            colors[dict.TERRAIN.SPAWN] = [113, 129, 178]; //'#7181b2';
            colors[dict.TERRAIN.GOAL] = [73, 104, 21]; //'#496815';
            return colors[c] || [0, 0, 0];
        }

        function clean(ctx) {
            ctx.fillStyle = toRgbString(getColor());
            ctx.fillRect(0, 0, width, height);
        }

        return function render(map, buildings, enemies) {
            clean(ctx);
            map.grid.forEach((line, y) =>
                line.forEach((cell, x) => {
                    if (cell === dict.TERRAIN.NOT_TRAVERSABLE) {
                        drawCell(cellSize*x, cellSize*y, getColor(cell));
                    } else {
                        ctx.fillStyle = toRgbString(getColor(cell));
                        ctx.fillRect(cellSize * x, cellSize * y, cellSize, cellSize);
                    }
                }));

            enemies.items.forEach(enemy => {
                const cellToPixel = pos => pos.map(c => c * cellSize);
                ctx.fillStyle = '#8ea052';
                ctx.fillRect(...cellToPixel(enemy.position), cellSize, cellSize);
            });

            buildings.forEach(building => {
                const cellToPixel = pos => pos.map(c => c * cellSize);
                ctx.fillStyle = '#a0528e';
                ctx.fillRect(...cellToPixel(building.position), cellSize, cellSize);
            });
        };
    };
});
/**
 * Created by ndyumin on 16.12.2015.
 */
define(['jquery', './func', './color'], function ($, f, c) {
    'use strict';

    const shifted = f.compose(c.shiftColor, c.toRgbString);

    return function (canvas, cellSize) {
        const ctx = canvas.getContext("2d");
        const $canvas = $(canvas);
        const width = $canvas.width();
        const height = $canvas.height();

        function drawTriangle(x1, y1, x2, y2, x3, y3, color) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            ctx.fill();
        }

        function drawSquare(x, y, color) {
            ctx.fillStyle = c.toRgbString(color);
            ctx.fillRect(cellSize * x, cellSize * y, cellSize, cellSize);
        }

        function clean (color) {
            ctx.fillStyle = c.toRgbString(color);
            ctx.fillRect(0, 0, width, height);
        }

        return {
            drawCell: function (x, y, color) {
                const shiftedColor = shifted(color);

                drawSquare(x, y, color);

                drawTriangle(
                    x, y,
                    x, y + cellSize,
                    x + cellSize, y,
                    shiftedColor(20)
                );

                drawTriangle(
                    x, y,
                    x, y + cellSize,
                    x + cellSize / 2, y + cellSize / 2,
                    shiftedColor(10)
                );

                drawTriangle(
                    x + cellSize, y + cellSize,
                    x, y + cellSize,
                    x + cellSize / 2, y + cellSize / 2,
                    shiftedColor(-10)
                );
            },

            drawTriangle: drawTriangle,

            drawSquare: drawSquare,

            clean: clean
        }
    };
});
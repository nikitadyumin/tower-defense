/**
 * Created by ndyumin on 11.12.2015.
 */
define(['jquery', './dict'], function($, dict) {
    'use strict';
    return function(sel) {
        const domElement = document.querySelector(sel);
        const clickS = $(domElement).asEventStream('click');

        function toPixelCoords (evt) {
            const rect = domElement.getBoundingClientRect();
            return [
                evt.clientX - rect.left,
                evt.clientY - rect.top
            ];
        }

        function toCellCoords (coords) {
            return coords.map(c => Math.floor(c / dict.GRID.CELL_SIZE * dict.VIEWPORT.RATIO));
        }

        return clickS
            .map(toPixelCoords)
            .map(toCellCoords);
    }
});
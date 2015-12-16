/**
 * Created by ndyumin on 15.12.2015.
 */
define(function() {
    'use strict';

    function toRgbString(rgb) {
        return `rgb(${rgb})`;
    }

    function shiftColor(rgb, v) {
        return rgb.map(x => x + v);
    }

    return {
        toRgbString: toRgbString,
        shiftColor: shiftColor
    };
});
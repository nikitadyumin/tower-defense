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
        const map = [];
        for (let i = 0; i < 30; i += 1) {
            map.push(generateLine());
        }

        map[10][2] = dict.TERRAIN.SPAWN;
        map[28][38] = dict.TERRAIN.GOAL;

        return Bacon.constant(map);
    }

    return generateMap;
});
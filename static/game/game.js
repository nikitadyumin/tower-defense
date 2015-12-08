/**
 * Created by ndyumin on 06.12.2015.
 */
define(['./map', './state', './renderer'],
    function (map, state, getRenderer) {
        'use strict';

        const render = getRenderer('canvas#game');
        const mapS = map();

        return function () {
            mapS
                .flatMapLatest(state)
                .onValue(render);
        };
    });
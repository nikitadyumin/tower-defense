/**
 * Created by ndyumin on 06.12.2015.
 */
define(['./map', './state', './renderer'],
    function (map, state, getRenderer) {
        'use strict';

        const render_frame = 30;
        const render = getRenderer('canvas#game');
        const mapS = map();

        return function () {
            const stateS = mapS.flatMapLatest(state);

            Bacon.interval(render_frame)
                .combine(stateS, (_, state) => state)
                .onValue(render);
        };
    });
/**
 * Created by ndyumin on 06.12.2015.
 */
define(['jquery', './dict', './map', './state', './input', './renderer'],
    function ($, dict, map, state, input, getRenderer) {
        'use strict';

        const render_frame = 30;
        const render = getRenderer(dict.VIEWPORT.SELECTOR);
        const mapS = map();
        const inputS = input(dict.VIEWPORT.SELECTOR).log();

        return function () {
            const stateS = mapS.flatMapLatest(state);

            Bacon.interval(render_frame)
                .combine(stateS, (_, state) => state)
                .onValue(render);

            return stateS;
        };
    });
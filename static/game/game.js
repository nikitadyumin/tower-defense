/**
 * Created by ndyumin on 06.12.2015.
 */
define(['jquery', '../util', './dict', './map', './buildings', './state', './input', './renderer'],
    function ($, util, dict, map, buildings, state, input, getRenderer) {
        'use strict';

        const render_frame = 30;
        const render = getRenderer(dict.VIEWPORT.SELECTOR);

        const mapS = map();
        const inputS = input(dict.VIEWPORT.SELECTOR);

        const buildingsS = Bacon.update(
            [],
            [mapS, inputS], buildings
        );

        const stateS = mapS.flatMap(state);

        return function () {
            Bacon.interval(render_frame)
                .combine(stateS, (_, state) => state)
                .onValue(render);

            return stateS;
        };
    });
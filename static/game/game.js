/**
 * Created by ndyumin on 06.12.2015.
 */
define(['jquery', '../util', './dict', './map', './buildings', './enemies', './state', './input', './renderer'],
    function ($, util, dict, map, buildings, enemies, state, input, getRenderer) {
        'use strict';

        const render_interval = 30;
        const tick_interval = 100;

        const render = getRenderer(dict.VIEWPORT.SELECTOR);

        return function () {
            const tickS = Bacon.interval(tick_interval);

            const mapS = map();
            const inputS = input(dict.VIEWPORT.SELECTOR);
            const buildingsS = buildings(mapS, inputS);
            const enemiesS = enemies(mapS, tickS);
            const stateS = state(mapS, buildingsS, enemiesS);

            Bacon.combineAsArray(mapS, buildingsS, enemiesS)
                .sample(render_interval)
                .onValues(render);

            return stateS;
        };
    });
'use strict';

requirejs.config({
    baseUrl: './',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        bacon: '../bower_components/bacon/dist/Bacon.min',
        pf: '../bower_components/pathfinding/pathfinding-browser'
    },
    shim: {
        'cf': {
            exports: 'crossfilter'
        },
        'pf': {
            exports: 'PF'
        }
    }
});

require(['bacon', './router'], function (Bacon, router) {
    function getLocationHash () {
        return location.hash
    }

    Bacon.fromEventTarget(window, 'hashchange')
        .toProperty('')
        .map(getLocationHash)
        .onValue(router);
});
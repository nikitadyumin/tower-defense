'use strict';

requirejs.config({
    baseUrl: './',
    paths: {
        lib: '../bower_components',
        jquery: '../bower_components/jquery/dist/jquery.min',
        bacon: '../bower_components/bacon/dist/Bacon.min',
        pf: '../bower_components/pathfinding/pathfinding-browser',
        d3: '../bower_components/d3/d3.min',
        c3: '../bower_components/c3/c3.min',
        cf: '../bower_components/crossfilter/crossfilter.min'
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
'use strict';

requirejs.config({
    baseUrl: './',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        bacon: '../bower_components/bacon/dist/Bacon.min',
        pf: '../bower_components/pathfinding/pathfinding-browser'
    },
    shim: {
        'bacon': {
            deps: ['jquery']
        },
        'pf': {
            exports: 'PF'
        }
    }
});

require(['jquery', 'bacon', './game/dict', './router'], function ($, Bacon, dict, router) {
    function enableFullScreen(el) {
        const request = el.requestFullScreen || el.mozRequestFullScreen || el.webkitRequestFullScreen;
        const cancel = document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;

        return function () {
            if (document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen) {
                if (cancel) {
                    cancel.call(document)
                }
            } else {
                if (request) {
                    request.call(el);
                }
            }
        };
    }

    function getLocationHash() {
        return location.hash
    }

    const $sel = $(dict.VIEWPORT.SELECTOR);
    const $fullScreenToggle = $('button#fullscreen');

    $sel.width($sel.width() / dict.VIEWPORT.RATIO);
    $fullScreenToggle.asEventStream('click')
        .onValue(enableFullScreen(document.documentElement));

    Bacon.fromEventTarget(window, 'hashchange')
        .toProperty('')
        .map(getLocationHash)
        .onValue(router);
});
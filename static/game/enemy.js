/**
 * Created by ndyumin on 06.12.2015.
 */
define(['bacon'], function(Bacon) {
    'use strict';
    return function(pos) {
        return Bacon.constant({
            position: pos
        });
    };
});
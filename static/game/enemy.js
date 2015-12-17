/**
 * Created by ndyumin on 06.12.2015.
 */
define(['bacon'], function(Bacon) {
    'use strict';
    return function(spawnPositions) {
        return Bacon.repeat(function (i) {
            const spawnPositionCount = spawnPositions.length;
            return Bacon.constant({
                damage: 100,
                position: spawnPositions[i % spawnPositionCount]
            });
        });
    };
});
/**
 * Created by ndyumin on 06.12.2015.
 */

define(['bacon', '../util'], function (Bacon, util) {
    'use strict';

    const healthL = util.lens('health');

    return function (mapS, buildingsS, enemiesS) {
        return mapS.flatMapLatest(function(map) {
            function updateHealth(state, enemies) {
                return healthL.set(state, map.health - enemies.damage);
            }

            return Bacon.update(
                {
                    health: map.health
                },
                [enemiesS], updateHealth
            );
        })
    };
});
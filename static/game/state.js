/**
 * Created by ndyumin on 06.12.2015.
 */

define(['bacon', '../util', './enemy', 'pf'], function(Bacon, util, enemy, pf) {
    'use strict';

    function addEnemy(enemies, enemy) {
        enemies.push(enemy);
        return enemies;
    }

    const tick_time = 500;
    const spawn_time = 1500;
    const enemiesL = util.lens('enemies');
    const mapL = util.lens('map');

    return function (map) {
        const grid = new pf.Grid(map.map(l=> l.map(x=>+(x === 5))));
        const finder = new pf.AStarFinder();

        function updatePositions(enemies) {
            return enemies.map(function(e) {
                const pos = e.position;
                const path = finder.findPath(pos[0], pos[1], 38, 28, grid.clone());
                e.position = path.length ? path[1] : pos;
                return e;
            });
        }

        //const enemyS = Bacon.interval(spawn_time)
        //    .flatMapLatest(enemy);

        const enemyS =  enemy();

        const mapS = Bacon.constant(map);
        const enemiesS = Bacon.constant([])
            .combine(enemyS, addEnemy)
            .map(updatePositions);

        return Bacon.interval(tick_time, {})
            .combine(enemiesS, enemiesL.set)
            .combine(mapS, mapL.set);
    };
});
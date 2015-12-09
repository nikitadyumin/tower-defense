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
    const mapL = util.lens('map');

    return function (map) {
        const grid = new pf.Grid(map.map(l=> l.map(x=>+(x === 5))));
        const finder = new pf.AStarFinder();

        function nextPosition(x, y) {
            const path = finder.findPath(x, y, 38, 28, grid.clone());
            return path.length  > 1 ? path[1] : [x, y];
        }

        function updatePositions(state, enemies) {
            state.enemies =  enemies.map(function(e) {
                e.position = nextPosition(e.position[0], e.position[1]);
                return e;
            });
            return state;
        }

        const enemyS = Bacon.interval(spawn_time)
            .flatMapLatest(enemy);

        const mapS = Bacon.constant(map);
        const enemiesS = Bacon.constant([])
            .combine(enemyS, addEnemy);

        return Bacon.interval(tick_time, {})
            .combine(enemiesS, updatePositions)
            .combine(mapS, mapL.set);
    };
});
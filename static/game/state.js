/**
 * Created by ndyumin on 06.12.2015.
 */

define(['bacon', '../util', './enemy', './dict', 'pf'], function (Bacon, util, enemy, dict, pf) {
    'use strict';

    function addEnemy(enemies, enemy) {
        enemies.push(enemy);
        return enemies;
    }

    const tick_time = 100;
    const spawn_time = 100;
    const mapL = util.lens('map');

    return function (map) {
        const grid = new pf.Grid(map.grid.map(line =>
            line.map( cell => cell === dict.TERRAIN.NOT_TRAVERSABLE ? 1 : 0)));

        const finder = new pf.AStarFinder();
        const spawnPositions = map.spawns;
        const tower = map.tower;

        function nextPosition(x, y) {
            const path = finder.findPath(x, y, tower[0], tower[1], grid.clone());
            return path.length > 1 ? path[1] : [x, y];
        }

        function updatePositions(state, enemies) {
            state.enemies = enemies.map(function (e) {
                e.position = nextPosition(e.position[0], e.position[1]);
                return e;
            });
            return state;
        }

        const enemyS = Bacon.repeatedly(spawn_time, spawnPositions)
            .flatMapLatest(enemy);

        const wavesS = Bacon.fromArray(map.waves)
            .flatMap(function (wave) {
                return Bacon.later(...wave)
            })
            .flatMap(function (n) {
                return enemyS.take(n);
            });

        const mapS = Bacon.constant(map);
        const enemiesS = Bacon.constant([])
            .combine(wavesS, addEnemy);

        return Bacon.interval(tick_time, {})
            .combine(enemiesS, updatePositions)
            .combine(mapS, mapL.set);
    };
});
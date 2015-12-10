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
    const spawn_time = 150;
    const mapL = util.lens('map');
    const enemiesL = util.lens('enemies');

    return function (map) {
        const grid = new pf.Grid(map.grid.map(line =>
            line.map( cell => cell === dict.TERRAIN.NOT_TRAVERSABLE ? 1 : 0)));

        const finder = new pf.AStarFinder();
        const spawnPositions = map.spawns;
        const tower = map.tower;

        function eq(xs, ys) {
            return xs.length === ys.length
                && xs.every((x, index) => x === ys[index]);
        }

        function nextPosition(x, y) {
            const path = finder.findPath(x, y, ...tower, grid.clone());
            return path.length > 1 ? path[1] : [x, y];
        }

        function updatePositions(state) {
            state.enemies = state.enemies.map(function (e) {
                e.position = nextPosition(...e.position);
                return e;
            });

            state.enemies
                .filter(e => eq(e.position, tower))
                .forEach(e => {
                   state.health -= e.damage;
                });

            state.enemies = state.enemies
                .filter(e => !eq(e.position, tower));

            return state;
        }

        const enemyS = Bacon.repeatedly(spawn_time, spawnPositions)
            .flatMapLatest(enemy);

        const wavesS = Bacon.fromArray(map.waves)
            .flatMap(wave => Bacon.later(...wave))
            .flatMap(n => enemyS.take(n));

        const mapS = Bacon.constant(map);
        const enemiesS = Bacon.constant([])
            .combine(wavesS, addEnemy);

        const state = {
            health: map.health
        };

        return Bacon.interval(tick_time, state)
            .combine(enemiesS, enemiesL.set)
            .throttle(tick_time)
            .map(updatePositions)
            .combine(mapS, mapL.set);
    };
});
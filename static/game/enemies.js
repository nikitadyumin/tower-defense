/**
 * Created by ndyumin on 12.12.2015.
 */
define(['pf', '../util', './dict', './enemy'], function (pf, util, dict, enemy) {
    'use strict';

    const spawn_time = 150;
    const finder = new pf.AStarFinder();

    const itemsL = util.lens('items');
    const positionL = util.lens('position');


    function initWaves(map) {
        const enemyS = Bacon.repeat(function (i) {
            const spawnPositions = map.spawns;
            const spawnPositionCount = spawnPositions.length;
            return Bacon.once(spawnPositions[i % spawnPositionCount])
        }).flatMap(enemy);

        return Bacon.fromBinder(function (sink) {
            const waves = map.waves;

            function schedule(delay, count) {
                setTimeout(function () {
                    sink(Bacon.Next(count));
                    if (waves.length) {
                        schedule(...waves.shift());
                    } else {
                        //sink(Bacon.End());
                    }
                }, delay);
            }

            schedule(...waves.shift());
        }).flatMap(function (c) {
            return enemyS.take(c);
        }).bufferingThrottle(spawn_time);
    }

    function addEnemy(enemies, enemy) {
        return itemsL.set(enemies, itemsL.get(enemies).concat(enemy));
    }

    function getUpdater(map) {
        const tower = map.tower;
        const grid = new pf.Grid(map.grid.map(line =>
            line.map(cell => cell === dict.TERRAIN.NOT_TRAVERSABLE ? 1 : 0)));


        function nextPosition(x, y) {
            const path = finder.findPath(x, y, ...tower, grid.clone());
            return path.length > 1 ? path[1] : [x, y];
        }

        return function (enemies) {
            const updatePosition = e => positionL.set(e, nextPosition(...positionL.get(e)));

            enemies.items
                .filter(e => util.eq(e.position, tower))
                .forEach(e => {
                    enemies.damage += e.damage;
                });

            return itemsL.set(
                enemies,
                itemsL.get(enemies)
                    .filter(e => !util.eq(e.position, tower))
                    .map(updatePosition)
            );
        }
    }

    return function (mapS, tickS) {
        return mapS.flatMapLatest(function (map) {
            const waveS = initWaves(map);
            return Bacon.update(
                {
                    items: [],
                    damage: 0
                },
                [waveS], addEnemy,
                [tickS], getUpdater(map)
            );
        });
    };
});
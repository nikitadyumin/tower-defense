/**
 * Created by ndyumin on 06.12.2015.
 */
define(['jquery', './game/game'], function($, game) {
    return function(route) {
        const aRoute = route.substring(1).split('#');
        const action = aRoute.shift();
        switch (action) {
            case 'newgame':
                //todo wrap into a `game-widget-controller`
                const stateS = game(aRoute);
                stateS.map(s => s.health).assign($('#health'), 'text');
                break;
        }
    }
});
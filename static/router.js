/**
 * Created by ndyumin on 06.12.2015.
 */
define(['./game/game'], function(game) {
    return function(route) {
        const aRoute = route.substring(1).split('#');
        const action = aRoute.shift();
        switch (action) {
            case 'newgame':
                game(aRoute);
                break;
        }
    }
});
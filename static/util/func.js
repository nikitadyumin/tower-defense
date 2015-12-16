/**
 * Created by ndyumin on 15.12.2015.
 */
define(function() {
    'use strict';

    function ncurry(fn, n, ...args) {
        if (n - args.length <= 0) {
            return fn.apply(null, args.slice(0, n));
        } else {
            return ncurry.bind(null, fn, n, ...args);
        }
    }

    function curry(fn, ...args) {
        return ncurry(fn, fn.length, ...args);
    }

    function compose(fn, ...fns) {
        const len = fn.length;

        function exec(args, fn, ...funcs) {
            const result = fn.apply(null, args);
            return funcs.length === 0
                ? result
                : exec([result], ...funcs);
        }

        return ncurry((...args) => exec(args, fn, ...fns), len);
    }

    return {
        ncurry: ncurry,
        curry: curry,
        compose: compose
    };
});
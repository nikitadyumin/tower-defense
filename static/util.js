/**
 * Created by ndyumin on 06.12.2015.
 */
define([], function() {
    "use strict";
    function copy(o) {
        return Object.keys(o).reduce(function(obj, propName) {
            obj[propName] = o[propName];
            return obj;
        }, {});
    }

    function fnSetter(propName) {
        return function(o, value) {
            const clone = copy(o);
            clone[propName] = value;
            return clone;
        }
    }

    function fnGetter(propName) {
        return function(o) {
            return o[propName];
        }
    }

    function lens(getterOrName, setter) {
        if (arguments.length === 1) {
            setter = fnSetter(getterOrName);
            getterOrName = fnGetter(getterOrName);
        }
        return {
            compose: function(lens) {
                return lens(function get(o) {
                    return lens.get(getterOrName(o));
                }, function set(o, value) {
                    return setter(o, lens.set(getterOrName(o), value));
                });
            },
            get: getterOrName,
            set: setter
        };
    }

    function eq(xs, ys) {
        return xs.length === ys.length
            && xs.every((x, index) => x === ys[index]);
    }

    return  {
        eq: eq,
        lens: lens,
        getter: fnGetter,
        setter: fnSetter
    };
});
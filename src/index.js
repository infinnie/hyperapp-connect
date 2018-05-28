/* eslint-disable indent */
/**
 * Turn an array or valid path string into another array.
 * @param{String|Array} path
 * @returns{Array}
 */
function getPathArray(path) {
    if (typeof path === "string") {
        return path.split(".");
    }
    return path.slice(0);
}

/**
 * Get an object slice that matches the given path.
 * @param{Array} path
 */
function getPath(obj, path) {
    path = getPathArray(path);
    while (path.length) {
        obj = obj[path.shift()];
    }
    return obj;
}

/**
 * Immutably extend an original state
 * @param {Array} path 
 */
function setPath(origState, path, val) {
    path = getPathArray(path);
    /// <var name="first">Path has been shifted when this is evaluated.</var>
    var first = path.shift(), objStack = path.slice(0, -1).reduce(function (prev, cur) {
        // do something
        return prev.concat(prev[prev.length - 1][cur] || {});
    }, [origState[first]]), tempObj, ret = {};
    while (path.length) {
        tempObj = {};
        tempObj[path.pop()] = val;
        val = Object.assign({}, objStack.pop(), tempObj);
    }
    ret[first] = val;
    return ret;
}

export function connect(path) {
    var hasPath = arguments.length > 0;
    return (
        /**
         * @param{Function} stateSelector
         * @param{{[x:string]:()=>Function}} mutations
         * @param{{[x:string]:Function}} ops
         */
        function (stateSelector, mutations, ops) {
            ops = ops || {};
            return function (props) {
                return function (state, actions) {
                    var stateSlice = hasPath ? getPath(state, path) : state,
                        render = props && props.render,
                        bound = stateSelector ? stateSelector(stateSlice) : stateSlice,
                        boundMutations = {}, boundOperations = {};
                    if (render) {
                        Object.keys(mutations).map(function (key) {
                            var val = mutations[key];
                            boundMutations[key] = function () {
                                /**
                                 * @type{Function} f
                                 */
                                var f = val.apply(null, arguments);
                                actions.inject(hasPath
                                    ? function (state) {
                                        return setPath(state, path, f(getPath(state, path)));
                                    } : f);
                            };
                        });
                        Object.keys(ops).map(function (key) {
                            var val = ops[key];
                            boundOperations[key] = function () {
                                var args = [].slice.call(arguments, 0);
                                return val.apply(null, [stateSlice, boundMutations].concat(args));
                            };
                        });
                        return render(bound, boundMutations, boundOperations);
                    }
                    return null;
                };
            };
        });
};

export function withInject(app) {
    return function (state, actions, view, root) {
        return app(state, Object.assign({}, actions || {}, {
            inject: function (x) {
                return x;
            }
        }), view, root);
    };
};
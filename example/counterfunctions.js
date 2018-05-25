export var mutations = {
    up: function (name, by) {
        return function (stateSlice) {
            var obj = {};
            obj[name] = stateSlice[name] + by;
            return Object.assign({}, stateSlice, obj);
        };
    }, down: function (name, by) {
        return function (stateSlice) {
            var obj = {};
            obj[name] = stateSlice[name] - by;
            return Object.assign({}, stateSlice, obj);
        };
    }
};

export var operations = {
    delayedDown: function (boundState, mutators, name, by) {
        setTimeout(function () {
            mutators.down(name, by);
        }, 2333);
    }
};
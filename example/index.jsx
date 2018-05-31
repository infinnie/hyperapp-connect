import { h, app } from "hyperapp";
import { withInject } from "../src/index";

var loadCounter = function (changeView) {
    return function () {
        import("./counter.jsx").then(function (module) {
            var Counter = module.default;
            changeView({
                data: {
                    count: 0,
                    otherCount: 0
                },
                view: function () {
                    return (<div>
                        <p>Counter</p>
                        <Counter name="count" by={1} />
                        <Counter name="otherCount" by={2} />
                    </div>);
                }
            });
        });
    };
};

withInject(app)(
    {
        pageData: null,
        currentView: function (state, actions) {
            return (<button type="button" onclick={loadCounter(actions.changeView)}>Load counters</button>);
        }
    }, {
        changeView: function (x) {
            return function () {
                return {
                    currentView: x.view,
                    pageData: x.data
                };
            };
        }
    }, function (state, actions) {
        return state.currentView(state, actions);
    }, document.getElementById("app")
);
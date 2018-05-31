# Hyperapp Dynamic Connect
Connect your components & dynamically inject actions.

[![npm](https://img.shields.io/npm/v/hyperapp-dynamic-connect.svg)](https://www.npmjs.org/package/hyperapp-dynamic-connect)

## Usage
Component.jsx
```jsx
import { h } from "hyperapp";
import { connect } from "hyperapp-dynamic-connect";
import { selector, mutations, operations } from "./functions";

var Connector = connect("pageData")(selector, mutations, operations);

export default function ({ name, by }) {
    return (<Connector render={function ({ [name]: value }, { up }, { delayedDown: down }) {
        return (<p>
            <button class="btn counterBtn" type="button" onclick={function () {
                down(name, by);
                return false;
            }}>
                &minus;
            </button>
            <span class="counterValue">{value}</span>
            <button class="btn counterBtn" type="button" onclick={function () {
                up(name, by);
                return false;
            }}>
                +
            </button>
        </p>);
    }} />);
}
```

index.jsx
```jsx
import { h, app } from "hyperapp";
import { withInject } from "hyperapp-dynamic-connect";
import Component from "./Component.jsx";

withInject(app)({
    pageData: {
        count: 0
    }
}, {}, function () {
    return (<div>
        <p>Counter</p>
        <Component name="count" by={1} />
    </div>);
}, document.getElementById("app"));
```

### Code splitting
index.jsx
```jsx
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
```

## Misc
**Does the `render()` function support returning an array?**

No, unfortunately not currently. For your returned arrays in `render()` functions to behave correctly, consider using https://github.com/infinnie/hyperapp (any of the branches that is not patch-1) instead.

**Which version of ECMAScript is the library written in?**

Although Hyperapp Dynamic Connect’s generated build code is ECMAScript 5 compatible in syntax, it requires `Object.assign()` which is an ECMAScript 6 method, which is unfortunate for old IE. Consider adding a polyfill that shims at lease `Object.assign()` if support is desired.

**Does it support IE8 or below?**

Not in this repository (unless shimmed). But maybe https://github.com/infinnie/countertest would one day get updated to support IE 6-8 for more complicated use cases.
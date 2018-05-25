# Hyperapp Dynamic Connect
Connect your components & dynamically inject actions.

[![npm](https://img.shields.io/npm/v/hyperapp-dynamic-connect.svg)](https://www.npmjs.org/package/hyperapp-dynamic-connect)

## Usage
Component.jsx
```jsx
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
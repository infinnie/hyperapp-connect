/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "^h$" }]*/

import { h, app } from "hyperapp";
import { withInject } from "../src/index";
import Counter from "./counter.jsx";

withInject(app)({
    pageData: {
        count: 0
    }
}, {}, function () {
    return (<div>
        <p>Counter</p>
        <Counter name="count" by={1} />
    </div>);
}, document.getElementById("app"));
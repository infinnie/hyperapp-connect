/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "^h$" }]*/

import { h, app } from "hyperapp";
import { withInject } from "../src/index";
import Counter from "./counter.jsx";

withInject(app)({
    pageData: {
        count: 0,
        otherCount: 0
    }
}, {}, function () {
    return (<div>
        <p>Counter</p>
        <Counter name="count" by={1} />
        <Counter name="otherCount" by={2} />
    </div>);
}, document.getElementById("app"));
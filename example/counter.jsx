/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "^h$" }]*/

import { h } from "hyperapp";
import { connect } from "../src/index";
import { mutations, operations } from "./counterfunctions";

var Connector = connect("pageData")(null, mutations, operations);

export default function (props) {
    var name = props.name, by = props.by;
    return (<Connector render={function (values, mutations, operations) {
        var value = values[name], up = mutations.up, down = operations.delayedDown;
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
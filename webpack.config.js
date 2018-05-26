/* eslint-env node */
/* eslint-disable no-console */
var path = require("path");

module.exports = {
    entry: {
        build: "./src/index.js",
        example: "./example/index.jsx"
    }, output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
        library: {
            root: "hyperappDynamicConnect",
            amd: "hyperapp-dynamic-connect"
        },
        libraryTarget: "umd",
        umdNamedDefine: true
    }, module: {
        rules: [{
            test: /\.jsx$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            options: {
                plugins: [
                    [
                        "transform-react-jsx",
                        {
                            pragma: "h"
                        }
                    ]
                ]
            }
        }]
    }, devtool: "#source-map",
    mode: "production"
};
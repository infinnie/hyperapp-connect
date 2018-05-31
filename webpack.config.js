/* eslint-env node */
var path = require("path");

module.exports = {
    entry: {
        build: "./src/index.js",
        example: "./example/index.jsx"
    }, output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: "[name].js",
        library: {
            root: "HyperappDynamicConnect",
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
                    "syntax-dynamic-import",
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
const path = require("path");

module.exports = {
    entry: "./src/Main.js",
    devtool: "inline-source-map",
    // watch: true,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "docs"),
    }
};

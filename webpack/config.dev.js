const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
const webpack = require("webpack");
const PACKAGE = require('../package.json');


module.exports = (env, argv) => {
    const listaReplaces = [{ search: '$$_VERSION_$$', replace: PACKAGE.version }];

    return {
        mode: "development",
        devtool: "eval-source-map",
        entry: "./src/Game.ts",
        output: {
            path: path.resolve(process.cwd(), 'public'),
            filename: "app.js"
        },
        resolve: {
            extensions: [".ts", ".js", ".json"]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: "ts-loader"

                },
                {
                    test: path.resolve(process.cwd(), "src/ts/Config/config.ts"),
                    loader: 'string-replace-loader',
                    options: {
                        multiple: listaReplaces
                    }
                },
                {
                    test: [/\.vert$/, /\.frag$/],
                    use: "raw-loader"
                },
                {
                    test: /\.(gif|png|jpe?g|svg|xml|glsl)$/i,
                    use: "file-loader"
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: './src/assets',
                        to: 'assets',
                        globOptions: {
                            ignore: [ '*.md' ]
                        }
                    },
                    {
                        from: './src/*.css',
                        to: '[name][ext]'
                    },
                    {
                        from: './src/*.ico',
                        to: '[name][ext]'
                    },
                ]
            }),
            new webpack.DefinePlugin({
                "typeof CANVAS_RENDERER": JSON.stringify(true),
                "typeof WEBGL_RENDERER": JSON.stringify(true),
                "typeof WEBGL_DEBUG": JSON.stringify(true),
                "typeof EXPERIMENTAL": JSON.stringify(true),
                "typeof PLUGIN_3D": JSON.stringify(false),
                "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
                "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
                "typeof FEATURE_SOUND": JSON.stringify(true)
            }),
            new HtmlWebpackPlugin({
                template: "./index.html"
            })
        ]
    }
};

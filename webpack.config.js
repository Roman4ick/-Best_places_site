const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
    mode: "development",
    entry: ["@babel/polyfill", "./src/script.js"],
    output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        port: 8080,
    },
    plugins: [
        new HTMLWebpackPlugin({
            inject: false,
            template: "./src/index.html",
            filename: "index.html",
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.[contenthash].css",
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessor: require("cssnano"),
            cssProcessorPluginOptions: {
                preset: ["default"],
            },
            canPrint: true,
        }),
        new CopyPlugin({
            patterns: [{
                    from: "source",
                    to: "dest"
                },
                {
                    from: "other",
                    to: "public"
                },
            ],
        }),
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: ["babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-class-properties"],
                    },
                },
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    "file-loader?name=./src/images/[name].[ext]",
                    {
                        loader: "image-webpack-loader",
                        options: {},
                    },
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: "file-loader?name=./src/vendor/[name].[ext]",
            },
        ],
    },
};
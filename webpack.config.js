const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path')

module.exports = {
    mode:'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist', open: true
    },
    module: {
        rules: [
            {
                test: /\.(gif|svg|png|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './images'
                        }
                    }
                ]
            },


            {
                test: /\.(ttf|otf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },


            // Loading SASS/SCSS
            {
                test: /\.(s[ca]ss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },


        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello World',
            buildTime: new Date().toISOString(),
            template: 'src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'catalog.html',
            template: 'src/catalog.html',

        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new CopyWebpackPlugin(
            {
                patterns: [
                    { from: "./src/images", to: "images" },
                    { from: "./src/fonts", to: "fonts" }
                ]
            }
        ),

    ],

    devServer: {
        open: true
    },
    optimization: {
        minimize: true,
        minimizer: [

            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },
};



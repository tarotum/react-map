const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const devMode = process.env.NODE_ENV !== "production";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js"
  },
  devtool: devMode ? "#eval-source-map" : "#source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(png|jp(e*)g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  }
};

if (devMode) {
  config.devServer = {
    contentBase: path.resolve(__dirname, "build"),
    hot: true,
    overlay: true,
    inline: true,
    publicPath: "/",
    historyApiFallback: true,
    stats: {
      all: false,
      // Show the url we're serving at
      wds: true,
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: true,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  };
  config.plugins = [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv()
  ];
} else {
  config.optimization = {
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})]
  };
  config.plugins = [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new Dotenv()
  ];
}

module.exports = config;

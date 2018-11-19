const path = require("path");
const webpack = require("webpack");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "style.css",
              outputPath: "/"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    modules: [path.join(__dirname, "src"), "node_modules"],
    alias: {
      Root: path.resolve(__dirname, 'src/'),
      Models: path.resolve(__dirname, 'src/models/'),
      Utils: path.resolve(__dirname, 'src/utils/'),
      Core: path.resolve(__dirname, 'src/core/'),
      Features: path.resolve(__dirname, 'src/features/'),
      Config: path.resolve(__dirname, 'src/config/'),
    }
  },
  devServer: {
    proxy: {
      // proxy URLs to backend development server
      "/app": "http://localhost:9191"
    },
    contentBase: path.join(__dirname, "public"), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    // hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true // only errors & warns on hot reload
    // ...
  },
  plugins: [
    // new ExtractTextPlugin('style.css')
  ],
  devtool: "eval-source-map"
};

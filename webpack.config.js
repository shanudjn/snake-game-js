const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/js", "index.js"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    // watch: true,
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      //   {
      //     test: /\.js$/,
      //     exclude: /node_modules/,
      //     use: {
      //       loader: "babel-loader",
      //       options: {
      //         presets: [
      //           [
      //             "@babel/preset-env",
      //             {
      //               targets: {
      //                 browsers: ["last 2 versions"],
      //               },
      //             },
      //           ],
      //         ],
      //       },
      //     },
      //   },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-modules-commonjs"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "assets", to: "assets" }],
    }),
  ],
};

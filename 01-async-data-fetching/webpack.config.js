let path = require("path")
let UglifyJSPlugin = require("uglifyjs-webpack-plugin")
let webpack = require("webpack")

let env = process.env.NODE_ENV
let minifyJS = env == "production"

let basePath = __dirname

module.exports = {
  entry: {
    "bundle": "./src/frontend.js",
  },
  output: {
    path: path.join(basePath, "public"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js(\?.*)?)$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            "presets": [
              ["env", {
                targets: {
                  browsers: ["last 2 versions", "safari >= 7"]
                },
                modules: false,
              }]
            ]
          },
        }],
      },
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
     ...(minifyJS ? [new UglifyJSPlugin()] : [])
  ],
  node: {
    fs: "empty" // TODO: think if I can/should avoid it
  }
}

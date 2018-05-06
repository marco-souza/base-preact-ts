import path from "path";
import webpack from "webpack";
import config from "common-config";
import VirtualModulePlugin from "virtual-module-webpack-plugin";
import filepaths from "../filepaths";

const baseConfig = {
  entry: {
    main: [ filepaths.src.index_js ],
    vendor: [
      'preact',
      'lodash'
    ]
  },
  output: {
    path: filepaths.dest + "/assets/",
    publicPath: "assets/",
    chunkFilename: "[id].chunk.js",
    filename: "[name].js"
  },
  module: {
    rules: [

      // Typescript
      {
        test: /\.tsx?$/,
        enforce: "pre",
        loader: 'tslint-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['awesome-typescript-loader']
      },

      // Images
      {
        test: /\.(png|jpg)$/,
        use: [
            {
                loader: "url-loader", options: {
                    limit: 8192,
                    //name: "images/[sha512:hash:base64:7].[ext]",
                    name: "images/[name].[ext]",
                    publicPath: "/assets/"
                }
            }
        ]
      },

      //Fonts
      {
        test: /\.(png|jpg)$/,
        use: [
            {
                loader: "url-loader", options: {
                    limit: 8192,
                    //name: "images/[sha512:hash:base64:7].[ext]",
                    name: "images/[name].[ext]",
                    publicPath: "/assets/"
                }
            }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, ".."),
      path.resolve(__dirname, "../src"),
      path.resolve(__dirname, "../node_modules"),
      // path.resolve(__dirname, "../darch/node_modules"),
    ],
    extensions: [ ".js", ".ts", ".tsx", ".png", ".jpg", ".css" ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
        "NODE_ENV"
    ]),
    new VirtualModulePlugin({
      moduleName: "config.js",
      contents: `module.exports = ${JSON.stringify(config)}`
    }),
  ]
};

export default baseConfig;
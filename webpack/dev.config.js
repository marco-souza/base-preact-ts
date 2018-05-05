import lodash from "lodash";
import webpack from "webpack";
import baseConfig from "./base.config.babel";

// Merge with base config
const devConfig = lodash.merge({}, baseConfig, {
    entry: Object.assign({}, baseConfig.entry, {
        main: [
          "webpack/hot/only-dev-server",
          "webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr", // eslint-disable-line
          baseConfig.entry.main[0],
        ]
    }),
    mode: "development",
    watch: true,
    devtool: "inline-source-map",
    plugins: baseConfig.plugins.concat([
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]),
});

// Export config
export default devConfig;
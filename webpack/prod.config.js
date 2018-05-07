import lodash from "lodash";
import webpack from "webpack";
import baseConfig from "./base.config.babel";

// Merge with base config
const prodConfig = lodash.merge({}, baseConfig, {
    optimization: {
        // minimize code
        minimize: true,

        // Old CommonsChunkPlugin for webpack < 4
        // https://github.com/webpack/webpack/issues/6357
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: "vendor",
                    name: "vendor",
                    filename: "vendor.js",
                    chunks: "initial",
                }
            }
        }
    }
});

// Export config
export default prodConfig;
import lodash from "lodash";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import baseConfig from "./base.config.babel";

// Merge with base config
const prodConfig = lodash.merge({}, baseConfig, {
    plugins: baseConfig.plugins.concat([
        new UglifyJsPlugin()
    ])
});

// Export config
export default prodConfig;
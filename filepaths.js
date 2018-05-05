const path = require("path");

module.exports = {
    dest: path.resolve(__dirname, "dist"),

    src: {
        html: "./src/index.pug",
        sitemap: "./src/sitemap.xml",
        index_js: "./src/index.tsx",
        js: [
          "./src/**/*.tsx",
          "./src/**/*.ts"
        ],
        assets: [
            "./src/assets/icons/**/*"
        ],
        i18n: [ "./src/assets/i18n/**/*" ]
    },

    vendor: {
        css: [],
        assets: []
    }
};

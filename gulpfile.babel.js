import path from "path";
import gulp from "gulp";
import gutil from "gulp-util";
import pug from "gulp-pug";
import yaml from "gulp-yaml";
import htmlmin from "gulp-htmlmin";
import jsonmin from "gulp-jsonmin";
import del from "del";
import webpack from "webpack";
import browserSync from "browser-sync";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "common-config";
import filepaths from "./filepaths";

const statsInfo = {
    colors: gutil.colors.supportsColor,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: true,
    version: true,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false
};

const bundleDoneCalled = {};

/****************************************************************
* Clean Tasks : remove destination folders
****************************************************************/
gulp.task("clean", function () {
    return del.sync([
        filepaths.dest
    ]);
});

/****************************************************************
* Assets Task : copy assets to dist
****************************************************************/
gulp.task("assets:fonts", function () {
    return gulp.src(filepaths.src.assets.fonts)
        .pipe(gulp.dest(filepaths.dest + "/assets/fonts"));
});

gulp.task("assets:images", function () {
    return gulp.src(filepaths.src.assets.images)
        .pipe(gulp.dest(filepaths.dest + "/assets/images"));
});

gulp.task("assets", [
    "assets:fonts",
    "assets:images"
]);

/****************************************************************
* i18n Task : compile i18n yaml setups
****************************************************************/
gulp.task("i18n", function () {
    return gulp.src(filepaths.src.i18n)
        .pipe(yaml({ space: 4 }))
        .pipe(jsonmin())
        .pipe(gulp.dest(filepaths.dest + "/assets/i18n"));
});

gulp.task("i18n:dev", function () {
    return gulp.src(filepaths.src.i18n)
        .pipe(yaml({ space: 4 }))
        .pipe(gulp.dest(filepaths.dest + "/assets/i18n"));
});

/****************************************************************
* Pug Task : compile pug templates
****************************************************************/
gulp.task("pug", function () {
    return gulp.src(filepaths.src.html)
        .pipe(pug({
            locals: config.webinfo
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(filepaths.dest));
});
gulp.task("pug:dev", function () {
    return gulp.src(filepaths.src.html)
        .pipe(pug({
            locals: config.webinfo
        }))
        .pipe(gulp.dest(filepaths.dest));
});

/****************************************************************
* Bundle Tasks : bundle all ts files into one
****************************************************************/
gulp.task("bundle", function (done) {
    const webpackConfig = require("./webpack/prod.config").default;

    webpack(webpackConfig, (err, stats) => {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString(statsInfo));

        if (!bundleDoneCalled.prod) {
            bundleDoneCalled.prod = true;
            done();
        }
    });
});

gulp.task("bundle:dev", function () {
    const webpackConfig = require("./webpack/dev.config").default;
    const bundler = webpack(webpackConfig);

    const opts = {
        ui: false,
        open: "local",
        notify: true,
        server: {
            baseDir: filepaths.dest,
            middleware: [
                webpackDevMiddleware(bundler, {
                    publicPath: "http://localhost:3000/assets/",
                    stats: {
                        colors: true
                    }
                }),
                webpackHotMiddleware(bundler)
            ]
        },
    };

    // Checkout this tutorials on webpack+gulp+hot_reload
    // - https://words.mxbry.com/making-react-webpack-browsersync-gulp-play-nice-and-hot-reload-b2c1e01522e3
    // - https://github.com/Browsersync/recipes/tree/master/recipes/webpack.react-hot-loader
    // - https://willowtreeapps.com/ideas/how-to-develop-apps-in-electron-using-react
    browserSync.init(opts, (err) => {
        if (err) {
            throw new gutil.PluginError("[browserSync]", err);
        }

        gutil.log("[BrowserSync] Finsished");
    });
});

/****************************************************************
* PRODUCTION TASK
****************************************************************/
gulp.task("production", [
    "pug",
    "i18n",
    "bundle"
]);

/****************************************************************
* DEVELOPMENT TASK
****************************************************************/
gulp.task("development", [
    "pug:dev",
    "i18n:dev",
    "bundle:dev"
], function () {
    gulp.watch(filepaths.src.html, [
        "pug:dev",
        () => browserSync.reload()
    ]);

    gulp.watch(filepaths.src.assets.fonts, [
        "assets:fonts",
        () => browserSync.reload()
    ]);

    gulp.watch(filepaths.src.assets.images, [
        "assets:images",
        () => browserSync.reload()
    ]);

    gulp.watch(filepaths.src.i18n, [
        "i18n:dev",
        () => browserSync.reload()
    ]);
});

/****************************************************************
* DEFAULT TASK : Choose task by NODE_ENV
****************************************************************/
gulp.task("default", [
    "clean",
    "assets",
    process.env.NODE_ENV || "production"
]);

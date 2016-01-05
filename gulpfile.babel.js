////////////
//Imports //
////////////

import browserSync from "browser-sync";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";



////////////////////////////
//Global vars & constants //
////////////////////////////

var plugin = gulpLoadPlugins();



///////////////////////
//Primary Gulp tasks //
///////////////////////

gulp.task("watch", ["build"], function () {
    browserSync.init({
        server: {
            baseDir: "dist",
            index: "views/index.html"
        },
        browser: "google chrome canary"
    });

    gulp.watch("./src/sass/*.scss", ["sass:build"]);
    gulp.watch("src/**/*.html", ["html:build"]);
    gulp.watch("dist/**/*.html").on("change", browserSync.reload);
});



/**
 * Build webapp
 */
gulp.task("build", ["html:build", "sass:build"]);



/**
 * Install project deps
 */
gulp.task("deps", ["sass:deps"]);



////////////////////
//Secondary tasks //
////////////////////

/**
 * Build HTML views
 */
gulp.task("html:build", function htmlBuildTask() {
    var htmlSrcFiles = "./src/**/*.html";
    var htmlBuildDir = "./dist";

    gulp.src(htmlSrcFiles)
    .pipe(plugin.html5Lint())
    .pipe(gulp.dest(htmlBuildDir));
});



/**
 * Process Sass to CSS
 */
gulp.task("sass:build", ["sass:comb"], function sassBuildTask() {
    var sassSrcFiles = "./src/sass/*.scss";
    var cssBuildDir = "./dist/css";

    gulp.src(sassSrcFiles)
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.sass().on("error", plugin.sass.logError))
    .pipe(plugin.sourcemaps.write("."))
    .pipe(gulp.dest(cssBuildDir))
    .pipe(browserSync.stream());
});



gulp.task("sass:comb", function sassCombTask() {
    var sassSrcFiles = "./src/sass/*.scss";
    var normalizeSCSS = "!./src/sass/_normalize.scss";
    var sassSrcDir = "./src/sass";

    gulp.src([sassSrcFiles, normalizeSCSS])
    .pipe(plugin.csscomb())
    .pipe(gulp.dest(sassSrcDir));
});



/**
 * Install Sass deps
 */
gulp.task("sass:deps", function sassDepsTask() {
    var normalizeCSS = "./node_modules/normalize.css/normalize.css";
    var sassSrcDir = "./src/sass";

    gulp.src(normalizeCSS)
    .pipe(plugin.rename({
        prefix: "_",
        extname: ".scss"
    }))
    .pipe(gulp.dest(sassSrcDir));
});

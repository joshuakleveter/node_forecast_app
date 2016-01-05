////////////
//Imports //
////////////

import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";



////////////////////////////
//Global vars & constants //
////////////////////////////

var plugin = gulpLoadPlugins();



///////////////////////
//Primary Gulp tasks //
///////////////////////

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
gulp.task("sass:build", function sassBuildTask() {
    var sassSrcFiles = "./src/sass/*.scss";
    var cssBuildDir = "./dist/css";

    gulp.src(sassSrcFiles)
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.sass())
    .pipe(plugin.sourcemaps.write("."))
    .pipe(gulp.dest(cssBuildDir));
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

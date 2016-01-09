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
    gulp.watch("src/**/*.js", ["js:test"]);
    gulp.watch("dist/**/*.js").on("change", browserSync.reload);
});



/**
 * Build webapp
 */
gulp.task("build", ["html:build", "js:build", "sass:build"]);



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
    var htmlSrcFiles = ["./src/**/*.html", "./src/**/*.hbs"];
    var htmlBuildDir = "./dist";

    gulp.src(htmlSrcFiles)
    .pipe(gulp.dest(htmlBuildDir));
});



/**
 * Build JS files
 */
gulp.task("js:build", function jsBuildTask() {
    var jsSrcFiles = "./src/**/*.js";
    var jsBuildDir = "./dist";

    gulp.src(jsSrcFiles)
    .pipe(plugin.eslint())
    .pipe(plugin.eslint.format())
    .pipe(gulp.dest(jsBuildDir));
});



/**
 * Process Sass to CSS
 */
gulp.task("sass:build", function sassBuildTask() {
    var sassSrcFiles = "./src/sass/*.scss";
    var cssBuildDir = "./dist/css";

    gulp.src(sassSrcFiles)
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.sass().on("error", plugin.sass.logError))
    .pipe(plugin.sourcemaps.write("."))
    .pipe(gulp.dest(cssBuildDir))
    .pipe(browserSync.stream());
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

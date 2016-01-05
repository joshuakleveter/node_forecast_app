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
    .pipe(plugin.htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true
    }))
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
    .pipe(gulp.dest(cssBuildDir));
});

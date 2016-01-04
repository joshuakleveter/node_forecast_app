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
gulp.task("build", ["html:build"]);



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
    .pipe(gulp.dest(htmlBuildDir));
});

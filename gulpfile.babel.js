////////////
//Imports //
////////////

import gulp from "gulp";



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
    var htmlBuildDir = "./dist/views";

    gulp.src(htmlSrcFiles)
    .pipe(gulp.dest(htmlBuildDir));
});

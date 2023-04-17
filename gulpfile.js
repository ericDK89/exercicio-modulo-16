const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");

function compressJs() {
  return gulp
    .src("./src/scripts/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/scripts"));
}

function compileSass() {
  return gulp
    .src("./src/styles/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./dist/styles"));
}

function compressImgs() {
  return gulp
    .src("./src/assets/**")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/assets"));
}

function defaultTask(cb) {
  compressJs();
  compileSass();
  compressImgs();
  cb();
}

exports.default = function () {
  gulp.watch("./src/**", { ignoreInitial: false }, gulp.series(defaultTask));
};

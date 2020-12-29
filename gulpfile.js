var gulp = require("gulp");
var browserify = require("browserify");
var buffer = require("vinyl-buffer");
var clean = require('gulp-clean');
var fancy_log = require("fancy-log");
var source = require("vinyl-source-stream");
var sourcemaps = require("gulp-sourcemaps");
var tsify = require("tsify");
var uglify = require("gulp-uglify");
var watchify = require("watchify");
var paths = {
  pages: ["src/*.html"],
};

var watchedBrowserify = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/main.ts"],
    cache: {},
    packageCache: {},
    outfile: "app.js",
  }).plugin(tsify)
);

gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});

function bundle() {
  return watchedBrowserify
    .bundle()
    .on("error", fancy_log)
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist"));
}

gulp.task("default", gulp.series(gulp.parallel("copy-html"), bundle));

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", fancy_log);

gulp.task("clean", function () {
    return gulp.src("dist/*", {read: false})
        .pipe(clean());
});

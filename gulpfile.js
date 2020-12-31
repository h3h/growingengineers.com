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
var browserifyOpts = {
  basedir: ".",
  debug: true,
  entries: ["src/main.ts"],
  cache: {},
  packageCache: {},
  outfile: "app.js",
};

var hostBrowserify = browserify(browserifyOpts).plugin(tsify);
var hostWatchify = watchify(browserify(browserifyOpts)).plugin(tsify);

function copyHTML() {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
}

function bundle(host) {
  return () => {
    console.log("host: ", host);
    return host.bundle().
      on("error", fancy_log)
      .pipe(source("app.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("dist"));
  }
}

gulp.task("default", gulp.series(copyHTML, bundle(hostBrowserify)));

gulp.task("watch", gulp.series(copyHTML, bundle(hostWatchify)));

hostWatchify.on("update", bundle(hostWatchify));
hostWatchify.on("log", fancy_log);

gulp.task("clean", function () {
  return gulp.src("dist/*", { read: false })
    .pipe(clean());
});

var gulp = require("gulp"),
   gutil = require("gulp-util"),
   concat = require("gulp-concat"),
   uglify = require("gulp-uglify"),
   less = require("gulp-less"),
   min = require("gulp-clean-css"),
   print = require("gulp-print"),
   postCSS = require("gulp-postcss"),
   autoprefixer = require("autoprefixer"),
   browserSync = require("browser-sync").create(),
   order = require('gulp-order'),
   plumber = require("gulp-plumber");
   
gulp.task("js", function () {
  return gulp.watch("js/*.js", function () {
    
    // src
    gulp.src(["js/*.js", "js/lib/howler/howler.js", "js/lib/x2js-v1.1.5/xml2json.js"])
      .pipe(order([
        "xml2json.js",
        'howler.js',
        'jasper.js',
        'util.js',
        'event.js',
        'asset.js',
        'entity.js',
        'controller.js',
        'graphics.js',
        'state.js',
        'init.js'
      ]))
      .pipe(plumber())
      .pipe(concat("jasper.js"))
      .pipe(gulp.dest("js/test/"))
      .pipe(gulp.dest("js/dist/"))
      .pipe(concat("jasper.min.js"))
      .pipe(uglify())
      .on('error', gutil.log)
      .pipe(gulp.dest("js/test/"))
      .pipe(gulp.dest("js/dist/"));
         
 }); 
});

//todo: add a task to use browser-sync for dev purposes

gulp.task("css", function () {
  return gulp.watch("style/less/*.less", function () {
    gulp.src("style/less/*.less")
      .pipe(plumber())
      .pipe(less())
      .pipe(postCSS([autoprefixer({version: ['last 2 versions']})]))
      .pipe(min())
      .pipe(gulp.dest("style/css/"));
  });
});


gulp.task("default", ["js", "css"]);
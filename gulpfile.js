var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var merge = require('merge2');
var nodemon = require('gulp-nodemon');
var copy = require('gulp-copy');
var pug = require('gulp-pug');
var path = require('path');
var sass = require('gulp-sass');

// gulp.task('default', function () {
//   return gulp.src('app/**/*.ts')
//     .pipe(ts({
//       out: 'output.js'
//     }))
//     .pipe(gulp.dest('built/local'));
// });

var tsProject = ts.createProject('./tsconfig.json');

gulp.task('clean:vendor', function() {
  return del(['built/vendor/**/*', 'built/vendor/*.js']);
})

gulp.task('copy:vendor', ['clean:vendor'], function(){
  return gulp.src([
    './node_modules/core-js/client/shim.min.js',
    './node_modules/zone.js/dist/zone.js',
    './node_modules/reflect-metadata/Reflect.js',
    './node_modules/systemjs/dist/system.src.js',
    './node_modules/@angular/**/*',
    './node_modules/rxjs/**/*',
    './systemjs.config.js',
    './vendor/**/*'
  ])
  .pipe(copy('built/vendor'));
})

gulp.task('clean:js', function(){
  return del(['built/app/**/*.js', 'built/definitions/**/*.js']);
})

gulp.task('compile:js', ['clean:js'], function() {
  var tsResult = gulp.src('./app/**/*.ts')
    .pipe(ts(tsProject));

  // Merge the two output streams, so this task is finished when the IO of both operations are done.
  return merge([
    tsResult.dts.pipe(gulp.dest('built/definitions')),
    tsResult.js.pipe(gulp.dest('built/app'))
  ]);
});

gulp.task('clean:css', function(){
  return del(['built/app/**/*.css']);
})

gulp.task('compile:css', ['clean:css'], function () {
  return gulp.src('./app/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('built/app'));
});

gulp.task('clean:html', function(){
  return del(['built/app/**/*.html']);
})

gulp.task('compile:html', ['clean:html'], function(){
  return gulp.src('./app/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('built/app'));
})

gulp.task('nodemon', ['copy:vendor', 'compile:js', 'compile:css', 'compile:html'], function(){
  nodemon({
    script: 'server.js',
    ext: 'js ts pug sass',
    env: { 'NODE_ENV': 'development' },
    ignore: 'built/**/*',
    tasks: function(changedFiles) {
      var tasks = [];
      changedFiles.forEach(function(file) {
        if (path.extname(file) === '.ts' && !~tasks.indexOf('compile:js')) tasks.push('compile:js')
        if (path.extname(file) === '.sass' && !~tasks.indexOf('compile:css')) tasks.push('compile:css')
        if (path.extname(file) === '.pug' && !~tasks.indexOf('compile:html')) tasks.push('compile:html')
      })
      return tasks;
    }
  })
})
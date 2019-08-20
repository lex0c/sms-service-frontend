const gulp = require('gulp');
const browserSync = require('browser-sync')
const reload = browserSync.reload;
const $ = require('gulp-load-plugins')();
const del = require('del');
const runSequence = require('run-sequence');
const modRewrite = require('connect-modrewrite');
const babel = require('gulp-babel');

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: './src/',
    },
    port: 3000,
  })
});

gulp.task('minify-css', () => {
  return gulp.src(['./styles/**/*.css', '!./styles/**/*.min.css'])
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.minifyCss({ keepBreaks: true }))
    .pipe(gulp.dest('./styles/'))
    .pipe(gulp.dest('./_build/css/'));
});

gulp.task('server', done => {
  return browserSync({
    server: {
      baseDir: './',
      middleware: [
        modRewrite(['^([^.]+)$ /index.html [L]'])
      ]
    },
    port: 3000
  }, done);
});

gulp.task('clean:build', callback => {
  return del([
    './_build/'
  ], callback);
});

gulp.task('concat', () => {
  return gulp.src('./js/*.js')
  .pipe($.concat('scripts.js'))
  .pipe(gulp.dest('./_build/'));
});

gulp.task('sass', () => {
  return gulp.src('./styles/style.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      style: 'expanded'
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./styles'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('sass:build', () => {
  return gulp.src('./styles/style.scss')
    .pipe($.sass({
      style: 'compact'
    }))
    .pipe($.autoprefixer('last 3 version'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('./_build/css'));
});

gulp.task('usemin', () => {
  return gulp.src('./src/index.html')
    .pipe($.htmlReplace({
      'templates': '<script type="text/javascript" src="js/templates.js"></script>'
    }))
    .pipe($.usemin({
      css: ['concat'],
      angularlibs: [$.uglify()],
      appcomponents: [babel(), $.uglify()],
    }))
    .pipe(gulp.dest('./_build/'));
});

gulp.task('templates', () => {
  return gulp.src([
      './src/**/*.html',
      '!bower_components/**/*.*',
      '!node_modules/**/*.*',
      '!_build/**/*.*'
    ])
    .pipe($.minifyHtml())
    .pipe($.angularTemplatecache({
      module: 'frontend',
    }))
    .pipe(gulp.dest('./_build/js'));
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('default', ['browser-sync', 'sass', 'minify-css'], function() {
  gulp.watch('./styles/*.css', function(file) {
    if (file.type === 'changed') {
      reload(file.path);
    }
  });
  gulp.watch(['./src/app/**/*.html', './src/index.html'], ['bs-reload']);
  gulp.watch(['./styles/**/*.scss', './src/**/*.scss'], ['sass', 'minify-css']);
});

gulp.task('build', callback => {
  runSequence(
    'clean:build',
    'sass:build',
    'templates',
    'usemin',
    callback
  );
});

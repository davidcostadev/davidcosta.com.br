var gulp         = require('gulp');
var concat       = require('gulp-concat');
var php          = require('gulp-connect-php');
var browserSync  = require('browser-sync').create();

var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');


var reload = browserSync.reload;

var path = {
    sass: {
        src: [
            './src/sass/app.scss'
        ],
        output: './assets/css/'
    },
    fonts: {
        src: [
            './bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
            './bower_components/font-awesome/fonts/*',
        ],
        output: './assets/fonts/'
    },
    js: {
        vendor: [
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js'
            // insira aqui os scripts que estao dentro do bowser
        ],
        app: [
            './src/js/script.js'
            // insira aqui seus scripts de projeto
        ],
        output: './assets/js'
    },
    watch: [
        './src/**/*',
        './assets/**/*',
        './**/*.html',
        './**/*.php'
    ]
};


gulp.task('sass', function () {
    return gulp.src(path.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                'Chrome > 20',
                'Android > 4.0',
                'Firefox 15',
                'IE 9'
            ],
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.sass.output));
});

gulp.task('js', function () {
    gulp.src(path.js.vendor)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(path.js.output));

    return gulp.src(path.js.app)
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.js.output));
});

gulp.task('php', function () {
    php.server({
        base: '.',
        port: 8010,
        keepalive: true
    });
});

gulp.task('sync', ['php'], function () {
    browserSync.init({
        // proxy : 'localhost'
        proxy: '127.0.0.1:8010',
        port: 3000,
        open: true,
        notify: false
    })
});

gulp.task('fonts', function () {
    return gulp.src(path.fonts.src)
        .pipe(gulp.dest(path.fonts.output));
});

gulp.task('watch', function () {
    gulp.watch(path.sass.src, ['sass']);
    gulp.watch(path.js.app, ['js']);
    gulp.watch(path.watch).on('change', reload);
});

gulp.task('default', ['fonts', 'sass', 'js', 'sync', 'watch']);

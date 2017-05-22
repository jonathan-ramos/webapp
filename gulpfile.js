var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var lost = require('lost');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
// var prettify = require('gulp-prettify');

var cssSrc = 'package/src/scss/**/*.scss';
var htmlSrc = 'package/src/html/*.html';
var jsSrc = 'package/src/js/**/*.js';
var cssDest = 'package/dist/css';
var htmlDest = 'package/dist/html';
var jsDest = 'package/dist/js';

// gulp.task('browserSync', function() {
//     browserSync.init({
//         server: {
//             baseDir: 'package/dist'
//         }
//     })
// })
// gulp.task('watch', ['browserSync', 'sass'], function() {
//     gulp.watch('cssSrc', ['sass']);
//     // Other watchers
// });

gulp.task('sass', function() {
    return gulp.src(cssSrc)
        .pipe(sass({
            style: 'compressed',
            errLogToConsole: true,
            onError: function(err) {
                return notify().write(err);
            }
        }))
        .pipe(postcss([lost()]))
        .pipe(autoprefixer())
        .pipe(gulp.dest(cssDest))
        .pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task('html', function() {
	gulp.src(['./package/src/html/pages/**/*.html'])
		.pipe(nunjucksRender({
      		path: ['./package/src/html/templates']
    	}))
		.pipe(gulp.dest(htmlDest));
});

// gulp.task('default', ['sass', 'html', 'js'], function () {
// 	browserSync.init({
// 		notify: false,
//         server: {
//             baseDir: "package/dist"
//         }
// 	});
// 	gulp.watch('package/src/scss/**/*', ['sass']);
// 	gulp.watch('package/src/html/**/*', ['html']);
// 	gulp.watch('package/src/js/**/*', ['js']);
// 	gulp.watch(['html/*.html', 'js/**/*.js'], {cwd: 'package/dist'}, reload);
// });

gulp.task('default', ['sass', 'html'], function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "package/dist"
        }
    });
    gulp.watch('package/src/scss/**/*', ['sass']);
    gulp.watch('package/src/html/**/*', ['html']);
    gulp.watch('package/src/js/**/*', ['js']);
    gulp.watch(['html/*.html', 'js/**/*.js'], {
        cwd: 'package/dist'
    }, browserSync.reload);
});
/** Note: remember to change the package/src to package/dist once you have completed the html and js tasks **/

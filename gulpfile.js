var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var lost = require('lost');
var browserSync = require('browser-sync').create();


var cssSrc = 'package/src/scss/**/*.scss',
	htmlSrc = 'package/src/html/**/*.html',
	jsSrc = 'package/src/js/**.*.js',
	cssDest = 'package/src/css',
	htmlDest = 'package/dist/html',
	jsDest = 'package/dist/js';

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'package/src'
		}
	})
})

gulp.task('sass', function(){
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
		.pipe(browserSync.reload({stream:true}));
})



gulp.task('watch', ['browserSync', 'sass'], function (){
	gulp.watch('cssSrc', ['sass']);
  	// Other watchers
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

gulp.task('default', ['sass'], function() {
	browserSync.init({
		notify: false,
        server: {
            baseDir: "package/src"
        }
	});
	gulp.watch('package/src/scss/**/*', ['sass']);
	gulp.watch('package/src/html/**/*', ['html']);
	gulp.watch('package/src/js/**/*', ['js']);
	gulp.watch(['html/*.html', 'js/**/*.js'], {cwd: 'package/src'}, browserSync.reload);
});
/** Note: remember to change the package/src to package/dist once you have completed the html and js tasks **/

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('bundle-ad', function(cb) {
    console.log('Starting build')
    pump([
            gulp.src('js/bundle.ad.js'),
            uglify(),
            gulp.dest('dist')
        ],
        cb
    );
});
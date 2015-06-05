var gulp = require('gulp');

var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

function metaFile() {
	return gulp.src('GrepolisAttackNotifier.meta.js');
}

gulp.task("default", function() {
	return gulp.src('GrepolisAttackNotifier.js')
		.pipe(babel())
		.pipe(uglify({
			preserveComments: 'all'
		}))
		.pipe(concat('GrepolisAttackNotifier.user.js'))
		.pipe(gulp.dest('.'));
})

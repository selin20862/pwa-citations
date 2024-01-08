const gulp = require('gulp');
const webp = require('gulp-webp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

gulp.task('webp', () =>
    gulp.src('src/img/*.{jpg,png}')
        .pipe(webp())
        .pipe(rename({ extname: '.webp' }))
        .pipe(gulp.dest('dist/img'))
);

gulp.task('minify-js', () => {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('renameHTML', function () {
    return gulp.src('src/*.html')
        .pipe(replace(/\.css/g, '.min.css'))
        .pipe(replace(/\.(jpg|png)/g, '.webp'))
        .pipe(replace(/\.js/g, '.min.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('webp', 'minify-js', 'renameHTML'));



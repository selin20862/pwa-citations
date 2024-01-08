const gulp = require('gulp');
const webp = require('gulp-webp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const cheerio = require('gulp-cheerio');

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
        .pipe(cheerio($ => {
            $('script[src!="../service-worker.js"]').each((index, element) => {
              const src = $(element).attr('src');
              if (src && src.endsWith('.js')) {
                $(element).attr('src', src.replace(/\.js$/, '.min.js'));
              }
            });
          }))    
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', gulp.series('webp', 'minify-js', 'renameHTML'));



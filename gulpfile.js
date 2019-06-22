// Import modules
const gulp = require('gulp'); 
const sass = require('gulp-sass');
const browserSync  = require('browser-sync');

// gulp.task('sass', () => { return gulp.src('app/scss/**/*.scss')
// .pipe(sass())
// .pipe(gulp.dest('app/css')); });

// gulp.task('watch', () => { 
//     gulp.watch('app/scss/**/*.scss', gulp.series('sass')); 
// });



// compile scss into css
function style(){
    // 1. Where is scss file?
    return gulp.src('app/scss/**/*.scss')
    // 2. Compile file
    .pipe(sass())
    // 3. Where do I save the complied CSS?
    .pipe(gulp.dest('app/css'))
}

exports.style = style
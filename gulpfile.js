// Import modules
const gulp = require('gulp'); 
const sass = require('gulp-sass');
const browserSync  = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');

// compile scss into css
function style(){
    // 1. Where is scss file?
    return gulp.src('app/scss/**/*.scss')
    // 2. Compile sass file
    .pipe(sass()).on('error', sass.logError)
    // 3. Add prefixes to code
    .pipe(postcss([autoprefixer]))
    // Minify the CSS
    .pipe(cleanCSS())
    // 4. Where do I save the complied CSS?
    .pipe(gulp.dest('app/css'))
    // 5. Stream changes to all browsers
    .pipe(browserSync.stream())
}

// watcher
function watch(){
    // specify server to run
    browserSync.init({
        server: {
            // server directory
            baseDir:'./app/'
        }
    });

    // Watch for any changes on scss files
        // run style task to complie any changes
    gulp.watch('app/scss/**/*.scss', style);

    // Watch for any changes in index files, reload browser on those changes
    gulp.watch('./*.html').on('change', browserSync.reload);

    // Watch for javaScript changes, reload on change
    gulp.watch('app/js/**/*.js').on('change', browserSync.reload);

}


// export tasks
exports.style = style
exports.watch = watch
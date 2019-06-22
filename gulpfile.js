// Import modules
    // general
    const gulp = require('gulp'); 
    const browserSync  = require('browser-sync').create();
    const sourcemaps = require('gulp-sourcemaps');

    // css
    const sass = require('gulp-sass');
    const postcss = require('gulp-postcss');
    const autoprefixer = require('autoprefixer');
    const cleanCSS = require('gulp-clean-css');

    // javascript
    const concat = require('gulp-concat');

    // Uglify does not support es6 to look into this
    // const uglify = require('gulp-uglify');


// compile scss into css
function style(){
    // 1. Where is scss file?
    return gulp.src('app/scss/**/*.scss')
    // 2. Compile sass file
    .pipe(sourcemaps.init())
    .pipe(sass()).on('error', sass.logError)
    // 3. Add prefixes to code
    .pipe(postcss([autoprefixer]))
    // Minify the CSS
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    // 4. Where do I save the complied CSS?
    .pipe(gulp.dest('app/css'))
    // 5. Stream changes to all browsers
    .pipe(browserSync.stream())
}

function javascript(){
    const preJSDirectory = './app/pre-js/';
    // Javascript files will be bundled in the order provided
    const preJSFiles = ['test-1.js', 'test-2.js'].map((fileName => {
        return `${preJSDirectory}${fileName}`;
    }));

    // 1. where to take js files from?
    return gulp.src(preJSFiles)

    // 2. How the file should be named?
    .pipe(concat('main.js'))

    // Uglify does not support es6 - to look into this - learn more on babel
    // .pipe(uglify())
    // Where output should be saved?
    .pipe(gulp.dest('./app/js'))
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

    // Watch for pre-javaScript changes, apply changes to the files on save
    gulp.watch('app/pre-js/**/*.js', javascript).on('change', browserSync.reload);

}


// export tasks
exports.style = style
exports.javascript = javascript
exports.watch = watch
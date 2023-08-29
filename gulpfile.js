// extraer funciones de gulp
const {src, dest, watch, series} = require('gulp');

// compilar css
const sass = require('gulp-sass')(require('sass'));
const purgecss= require('gulp-purgecss');
const rename= require('gulp-rename');

// imagenes
const imagemin = require('gulp-imagemin');

function cssbuild(done){

    src('buil/css/app.css')
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(purgecss({
            content:['index.html']
        }))
        .pipe(dest('buil/css'))

    done();
}

function css(done){

    // identificar archivo principal
    src('src/scss/app.scss')
    .pipe(sass())   // compilar sass
    .pipe(dest('build/css')) // exportarlo o guardarlo en una ubicacion


    done();
}


function dev(){
    watch('src/scss/**/*.scss', css);


}


function imagenes(done){

    src('src/img/**/*')
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe( dest('build/img'))

    done();

}

exports.css= css;
exports.dev= dev;
exports.imagenes= imagenes;
exports.default = series(css,imagenes,dev);
exports.cssbuild= series(cssbuild);

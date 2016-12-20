const path = require('path');

const gutil = require('gulp-util');

const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');
const jadeEngine = require('gulp-jade');

const conf = require('../conf/gulp.conf');


gulp.task('set-dev', function(cb) {
    gutil.env.type = 'dev';
    cb();
});


gulp.task('set-test', function(cb) {
    gutil.env.type = 'test';
    cb();
});


gulp.task('set-prd', function(cb) {
    gutil.env.type = 'prd';
    cb();
});

gulp.task('clean', clean);
gulp.task('other', other);
gulp.task('other:dist', other);
gulp.task('jade', jade);
gulp.task('jade:dist', jade);

function clean() {
    return del([conf.paths.dist, conf.paths.tmp]);
}

function other() {
    let destPath = conf.paths.dist;
    if(gutil.env.type == "dev") {
        destPath = conf.paths.tmp;
    }
    const fileFilter = filter(file => file.stat.isFile());

    return gulp.src([
        path.join(conf.paths.src, '/**/*'),
        path.join(`!${conf.paths.src}`, '/**/*.{scss,css,js,jade}')
    ])
        .pipe(fileFilter)
        .pipe(gulp.dest(destPath));

    // return gulp.src([
    //     path.join(conf.paths.src, '/**/*.{json}'),
    //     path.join(`${conf.paths.src}*/datacenter*/templates*/**`)])
    //     .pipe(fileFilter)
    //     .pipe(gulp.dest(conf.paths.dist));
}

function jade() {
    let destPath = conf.paths.dist;
    if(gutil.env.type == "dev") {
        destPath = conf.paths.tmp;
    }
    return gulp.src(conf.paths.src + '/webapp*/*.jade')
        .pipe(jadeEngine({
            pretty: true,
            locals: {
                // stylesheetFilename: 'framework7.ios',
                // stylesheetColorsFilename: 'framework7.ios.colors',
                // scriptFilename: 'framework7'
            }
        }))
        .pipe( gulp.dest(destPath) );
}

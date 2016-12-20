const gulp = require('gulp');
const gutil = require('gulp-util');

//Gulp-hub will execute that task in all of the gulpfiles.
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');
// Load some files into the registry
// conf.path.tasks("*.js") ====> gulp_tasks/*.js
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('build', gulp.parallel('set-test', 'webpack:dist', 'other:dist', 'jade:dist'));
gulp.task('prepublish', gulp.series('test'));

/*打包部署*/
gulp.task('default', gulp.series('set-prd', 'clean', 'build'));

/*启动服务,开发*/
gulp.task("server", gulp.series('set-dev', 'webpack:watch', 'watch', 'other', 'jade', 'browsersync'));

/*启动服务,测试*/
gulp.task("server:dist", gulp.series('set-prd', 'default', 'browsersync:dist'));

gulp.task('test', gulp.series('set-test', 'karma:single-run'));
gulp.task('test:auto', gulp.series('set-test', 'karma:auto-run'));

gulp.task("watch", watch);

function reloadBrowserSync(cb) {
    browserSync.reload();
    cb();
}

function watch(done) {
    let watcher = gulp.watch( conf.paths.src + '/webapp/*.jade', gulp.series('jade', reloadBrowserSync) );
    watcher.on('change', function(event, a, b, c) {
        debugger;
        gutil.log( gutil.colors.red('File ' + event + ' was changed.') );
    });
    gulp.watch(conf.path.tmp('index.html'), reloadBrowserSync);
    done();
}


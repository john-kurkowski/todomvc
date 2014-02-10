var http = require('http');

var gulp = require('gulp');

var concat = require('gulp-concat');
var ecstatic = require('ecstatic');
var handlebars = require('gulp-ember-handlebars');
var styl = require('gulp-styl');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var streamqueue = require('streamqueue');

gulp.task('scripts', function() {
    var js, templates;

    js = gulp.src([
            'bower_components/jquery/jquery.min.js',
            'bower_components/handlebars/handlebars.runtime.js',
            'bower_components/ember/ember.js',
            'bower_components/ember-data/ember-data.js',
            'bower_components/ember-localstorage-adapter/localstorage_adapter.js',
            'js/**/*.js'
        ]);

    templates = gulp.src(['js/templates/*.hbs'])
        .pipe(handlebars({
            outputType: 'browser'
        }));

    streamqueue({ objectMode: true },
        js,
        templates
    )
        .pipe(concat('dest.js'))
        .pipe(gulp.dest('build'))
        .pipe(refresh(server));
})

gulp.task('styles', function() {
    gulp.src(['bower_components/**/*.css'])
        .pipe(concat('dest.css'))
        .pipe(styl({compress : true}))
        .pipe(gulp.dest('build'))
        .pipe(refresh(server))
})

gulp.task('server', function() {
    http.createServer(ecstatic({ root: __dirname + '/build' })).listen(3000);

    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('default', function() {
    gulp.run('server', 'scripts', 'styles');

    gulp.watch('js/**/*.js', function(event) {
        gulp.run('scripts');
    })

    gulp.watch('bower_components/**/*.css', function(event) {
        gulp.run('styles');
    })
})

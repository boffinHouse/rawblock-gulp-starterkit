/**
 * Dependencies
 */
'use strict';

// Configs
const configs = require('./tasks/_configs');

// Gulp + plugins
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
require('gulp-grunt')(gulp);


// Non-gulp modules
plugins.path = require('path');
plugins.browserSync = require('browser-sync');
plugins.runSequence = require('run-sequence'); //temporary solution until the release of gulp 4.0
plugins.eventStream = require('event-stream');


// Shared paths
const paths = {

    // Build paths
    base: __dirname,
    src: plugins.path.join(__dirname, configs.paths.src),
    dev: plugins.path.join(__dirname, configs.paths.dev),
    dist: plugins.path.join(__dirname, configs.paths.dist),
    tasks: plugins.path.join(__dirname, configs.paths.tasks),

    // Assets
    assets: {
        styles: plugins.path.join(__dirname, configs.paths.src, 'sass'),
        js: plugins.path.join(__dirname, configs.paths.src, 'js'),
        fonts: plugins.path.join(__dirname, configs.paths.src, 'fonts'),
        images: plugins.path.join(__dirname, configs.paths.src, 'img')
    },

    // HTML templates, node modules
    html: plugins.path.join(__dirname, configs.paths.src, 'templates'),
    modules: plugins.path.join(__dirname, 'node_modules')
};


/**
 * Child tasks
 */
plugins.getTaskModule = function(task) {
    return require(plugins.path.join(paths.tasks, task))(paths, gulp, plugins);
};


gulp.task('styles', plugins.getTaskModule('styles'));
gulp.task('watch', plugins.getTaskModule('watch'));
//gulp.task('bundle-libs', plugins.getModule('javascript/bundle-libs'));
//gulp.task('bundle-modules', plugins.getModule('javascript/bundle-modules'));
//gulp.task('html', plugins.getTaskModule('html-assemble'));
//gulp.task('image-fallbacks', plugins.getModule('images/fallbacks'));
//gulp.task('image-optimise', plugins.getModule('images/optimise'));
gulp.task('browser-sync', plugins.getTaskModule('browser-sync'));


/**
 * Utility tasks
 */

// Clean build directory
gulp.task('clean', function(fn) {
    return require('del')([
        plugins.path.join(paths.dev, '*'),
        plugins.path.join(paths.dist, '*')
        ], fn);
});

//Task to change to development phase
gulp.task('set-development', function() {
     configs.production = true;
});

/**
 * Main tasks
 */

//Task default
gulp.task('default', function(fn) {
    plugins.runSequence('dev', fn);
});


gulp.task('build', ['clean'], function(fn) {
    plugins.runSequence('styles',['grunt-assemble'], fn);
});

//Task used in development phase.
gulp.task('dev', function(fn) {
   plugins.runSequence('build', ['watch', 'browser-sync'], fn);
});

//Task used for distribution
gulp.task('dist', ['set-development'], function(fn) {
   plugins.runSequence('build', fn);
});

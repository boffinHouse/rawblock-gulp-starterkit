/**
 * CSS tasks to create css files from sass
 *
 * @param paths {object} Shared paths from gulpfile
 * @param gulp {object} Gulp object
 * @param plugins {object} Shared tasks (uses gulp-load-plugins to get tasks from package.json)
 * @returns {Function} Return Module
 */
module.exports = function(paths, gulp, plugins) {
    'use strict';

    const sassGlob = require('gulp-sass-glob');
    const autoprefixer = require('autoprefixer');
    const csswring = require('csswring');
    const eyeglass = require('eyeglass').decorate;
    const gulpif = require('gulp-if');

    function createCSS (name, glob, options, production) {
        let destination = !production ? paths.dev :  paths.dist;

        return gulp.src(glob)

                   //Process Sass
                   .pipe(sassGlob())
                   .pipe(gulpif(!production, plugins.sourcemaps.init()))
                   .pipe(plugins.sass(options.sass).on('error', plugins.sass.logError))

                   //Process PostCSS
                   .pipe(plugins.postcss([
                           autoprefixer(options.autoprefixer),
                           //csswring(options.csswring),
                   ]))

                   //Write files
                   .pipe(gulpif(!production, plugins.sourcemaps.write('.')))
                   .pipe(gulp.dest(plugins.path.join(destination, options.dest)))

                   //Reload in Browser
                   .pipe(gulpif(!production, plugins.filter('**/*.css')))
                   .pipe(gulpif(!production, plugins.browserSync.reload({ stream: true })));
    }

    return function() {
        const configs = require('./_configs');
        const taskConfigs = configs.tasks(paths, gulp, plugins);

        return createCSS(taskConfigs.styles.name, taskConfigs.styles.globFiles, taskConfigs.styles, configs.production);
    };
};
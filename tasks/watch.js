/**
 * Watch tasks observes file changes and handles on it
 *
 * @param paths {object} Shared paths from gulpfile
 * @param gulp {object} Gulp object
 * @param plugins {object} Shared tasks (uses gulp-load-plugins to get tasks from package.json)
 * @returns {Function} Return Module
 */
module.exports = function(paths, gulp, plugins) {
    'use strict';

    const pathCSS = [
        plugins.path.join(paths.assets.styles, '{,**/}*.scss')
    ];
    const pathHTML = [
        plugins.path.join(paths.html, '{,**/}*.hbs')
    ];

    return function() {

        //Watch for css changes
        plugins.watch(pathCSS, function() {
            gulp.start('styles');
        });

        //Watch for html changes
        plugins.watch(pathHTML, function() {
            gulp.start('grunt-assemble');
        });
    };
};
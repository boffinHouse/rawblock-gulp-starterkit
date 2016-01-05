/**
 * Creates html pages from hbs templates (with assemble)
 *
 * @param paths {object} Shared paths from gulpfile
 * @param gulp {object} Gulp object
 * @param plugins {object} Shared tasks (uses gulp-load-plugins to get tasks from package.json)
 * @returns {Function} Return Module
 */
module.exports = function(paths, gulp, plugins) {
    "use strict";

    const assemble = require('assemble');
    const extname = require('gulp-extname');

    return function() {
        assemble.layouts(plugins.path.join(paths.html, 'layouts/*.hbs'));
        assemble.pages(
           plugins.path.join(paths.html, 'pages/*.hbs')
        );
        assemble.partials(
           plugins.path.join(paths.html, 'partials/*.hbs')
        );

        return assemble.src(plugins.path.join(paths.html, '*.hbs'))
                       .pipe(plugins.rename({extname: '.html'}))
                       .pipe(assemble.dest(paths.build))
                       .pipe(plugins.browserSync.reload({ stream: true}));
    };

};
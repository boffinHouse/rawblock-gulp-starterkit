/**
 * Starts server and reloads
 *
 * @param paths {object} Shared paths from gulpfile
 * @param gulp {object} Gulp object
 * @param plugins {object} Shared tasks (uses gulp-load-plugins to get tasks from package.json)
 * @returns {Function} Return Module
 */

module.exports = function(paths, gulp, plugins) {
    'use strict';

    return function() {
        const configs = require('./_configs').tasks(paths, gulp, plugins);

        return plugins.browserSync(configs.browserSync);
    };
};

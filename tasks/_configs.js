/**
 * Config for all gulp tasks
 *
 * @param paths {object} Shared paths from gulpfile
 * @param gulp {object} Gulp object
 * @param plugins {object} Shared tasks (uses gulp-load-plugins to get tasks from package.json)
 */

module.exports = {
    production: false,
    paths: {
        src: 'sources',
        dev: 'dev',
        dist: 'dist',
        tasks: 'tasks'
    },
    tasks(paths, gulp, plugins) {
        'use strict';

        return {

            //CSS Settings
            styles: {
                globFiles: [
                    plugins.path.join(paths.assets.styles, 'styles.scss')
                ],
                dependencies: [
                    plugins.path.join(paths.modules, 'normalize.css/normalize.css')
                ],

                autoprefixer: {
                    browsers: ['last 2 versions'],
                    cascade: false,
                    map: true,
                    remove: true,
                },
                sass: {
                    errLogToConsole: true,
                    eyeglass: {
                        enableImportOnce: true
                    },
                    style: 'compressed',

                    importer: function(uri, prev, done) {
                        done(plugins.sass.compiler.types.NULL);
                    }
                },
                csswring: {
                    removeAllComments: true
                },
                dest: 'css'
            },

            // Browsersync Settings
            browserSync: {
                browser: [
                    'google chrome'
                ],
                notify: false,
                port: 9000,
                startPath: '/index.html',
                server: { baseDir: paths.dev }
            }
        };
    }
};

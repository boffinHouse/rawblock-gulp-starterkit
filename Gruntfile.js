// Configs

module.exports = function(grunt) {
    'use strict';
    const configs = require('./tasks/_configs');

    grunt.initConfig({
        assemble: {
            options: {
                partials: ['./sources/templates/partials/**/*.hbs'],
                layoutdir: './sources/templates/layouts/',
                data: ['./sources/templates/data/*.json']
            },
            site: {
                files: [
                    {
                        expand: true,
                        cwd: "./sources/templates/pages/",
                        src: "**/*.hbs",
                        dest: configs.paths.dev,
                        ext: ".html"
                    }
                ]
            }
        }
    });
    grunt.loadNpmTasks("assemble");
    return grunt.registerTask('grunt-assemble', ['assemble']);
};
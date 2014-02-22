module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            basicss: 'basicss',
            css: 'tests/assets/css'
        },

        // SCSS
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.scss'
                }
            },
            build: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.scss'
                }
            }
        },

        // CSS autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            dist: {
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.css'
                }
            }
        },

        // Connect Server
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'tests',
                    open: true
                }
            }
        },

        // Watch
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: [
                    '<%= dirs.css %>/*.scss',
                    '*.scss',
                    '<%= dirs.basicss %>/**/*.scss'
                ],
                tasks: ['sass:dev', 'autoprefixer'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', ['sass:build', 'autoprefixer']);
    grunt.registerTask('dev', ['connect', 'watch']);
};

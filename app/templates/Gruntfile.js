// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        watch: {
            options: {
                nospawn: false
            },
            blacksmith: {
                files: [
                    'content/posts/{,*/}*.*',
                    'layouts/{,*/}*.{html,json}',
                    'pages/{,*/}*.{html,json}',
                    'partials/{,*/}*.{html,json}',
                ],
                tasks: ['blacksmith']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'public/**/*.*'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, 'public')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%%= connect.options.port %>'
            }
        },
        clean: {
            blacksmith: [
                'public/*',
                '!public/scripts',
                '!public/styles'
            ]
        }
    });

    grunt.registerTask('blacksmith', function (target) {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('blacksmith', {}, function (err, stdout, stderr) {
            // error handling with stdout
            err ? console.error(stderr) : console.log(stdout);
            cb();
        });
    });

    grunt.registerTask('server', function (target) {
        grunt.task.run([
            'clean:blacksmith',
            'blacksmith',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('default', [
        'clean:blacksmith',
        'blacksmith'
    ]);
};

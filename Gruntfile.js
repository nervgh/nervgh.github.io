'use strict';

var loadGruntTasks = require('load-grunt-tasks');
var webpack = require('webpack');


module.exports = function(grunt) {
    loadGruntTasks(grunt);

    grunt.initConfig({

        // Read configuration from package.json
        pkg: grunt.file.readJSON('package.json'),

        // https://github.com/gruntjs/grunt-contrib-clean
        //clean: {
        //    common: ['']
        //},

        // https://github.com/gruntjs/grunt-contrib-copy
        //copy: {
        //    postinstall: {
        //        src: './node_modules/babel/browser-polyfill.js',
        //        dest: './httpdocs/js/polyfills/browser-polyfill.js'
        //    }
        //},

        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            // global
            options: {
                options: {
                    interrupt: true,
                    spawn: false
                }
            },
            'blind': {
                files: [
                    './sandbox/state-space/blind/src/*.js',
                    './sandbox/state-space/blind/src/*.json',
                    './sandbox/state-space/blind/src/*.html'
                ],
                tasks: ['webpack:blind']
            },
            'heuristic': {
                files: [
                    './sandbox/state-space/heuristic/src/*.js',
                    './sandbox/state-space/heuristic/src/*.json',
                    './sandbox/state-space/heuristic/src/*.html'
                ],
                tasks: ['webpack:heuristic']
            }
        },

        // webpack
        // http://babeljs.io/docs/using-babel/#webpack
        // https://github.com/webpack/grunt-webpack
        webpack: {
            // common
            options: {
                module: {
                    loaders: [
                        // https://github.com/babel/babel-loader
                        {test: /\.(js|jsx)$/, loader: 'babel'},
                        // https://github.com/webpack/json-loader
                        {test: /\.json$/, loader: 'json'},
                        // https://github.com/webpack/html-loader
                        {test: /\.html$/, loader: 'html'}
                    ]
                },
                plugins: [
                    // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    })
                ],
                devtool: 'source-map',
                debug: true
            },
            'blind': {
                entry: {
                    bundle: './sandbox/state-space/blind/src/client.js'
                },
                output: {
                    path: './sandbox/state-space/blind/dist/',
                    filename: '[name].js'
                }
            },
            'heuristic': {
                entry: {
                    bundle: './sandbox/state-space/heuristic/src/client.js'
                },
                output: {
                    path: './sandbox/state-space/heuristic/dist/',
                    filename: '[name].js'
                }
            }
        }

    });

    grunt.registerTask('default', ['webpack']);
};

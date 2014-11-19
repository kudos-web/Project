/*
 * grunt-contrib-uglify
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		csslint: {
			options: {
				csslintrc: '.csslintrc',
				formatters: [
					{id: 'lint-xml', dest: 'csslint.xml'}
				]
			},
			all: {
				src: ['site/styles/*.css']
			}
		},

		cssmin: {
			combine: {
				options: {
				},
				files: {
					'site/styles/styles.min.css': [
						'site/styles/site-base.css',
						'site/styles/site-type-reset.css',
						'site/styles/site-type-icons.css',
						'site/styles/site-layouts.css',
						'site/styles/site-siteelements.css',
						'site/styles/site-siteelements-buttons.css',
						'site/styles/site-siteelements-listings.css'
					]
				}
			}
		},

		jshint: {
			all: [
				'site/scripts/assets/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			},
			jenkins: {
					options: {
							reporter: require('jshint-jenkins-violations-reporter'),
							reporterOutput: 'jshint.xml',
					},
					src: [ 'site/scripts/assets/*.js' ]
			}
		},

		requirejs: {
			compile: {
				options: {
					name: "lib/almond/almond",
					include: ["main"],
					baseUrl: "site/scripts/",
					mainConfigFile: "site/scripts/main.js",
					out: "site/scripts/main.min.js",
					//optimize: "none",
					insertRequire: ["main"]
				}
			}
		},

		phantomas: {
			performance : {
				options : {
					assertions : {},
					indexPath            : './performance/',
					url                  : 'http://kudosweb.com/',
					numberOfRuns         : 10
				}
			}
		},

		usebanner: {
			build: {
				options: {
					position: 'top',
					banner: '/*! \nSite - ' + 
								'<%= grunt.template.today("dd mmmm yyyy") %>\n' +
								'Community service which fosters participation in sport and active living.\n\n' +
								'(c) <%= grunt.template.today("yyyy") %> Kudos Web ' +
								'- http://www.kudosweb.com \n*/\n',
					linebreak: true
				},
				files: {
					src: [ 'site/scripts/main.min.js', 'site/styles/styles.min.css' ]
				}
			}
		},

		watch: {
			css: {
				files: 'site/styles/*.css',
				tasks: ['csslint:strict']
			},
			scripts: {
				files: [ 'site/scripts/assets/*.js' ],
				tasks: ['jshint']
			}
		}


	});

	// grunt.option('force', true);

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-csslint');

	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-phantomas');

	grunt.loadNpmTasks('grunt-banner');


	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.

	grunt.registerTask('lint', ['csslint:all', 'jshint:all']);

	grunt.registerTask('watch', ['csslint:all', 'jshint:all']);

	grunt.registerTask('build', ['requirejs:compile', 'cssmin:combine', 'usebanner:build']);

	grunt.registerTask('jenkins', ['csslint:all', 'jshint:jenkins', 'requirejs:compile', 'cssmin:combine', 'usebanner:build']);

	// grunt.registerTask('performance', ['phantomas:performance']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['csslint:all', 'jshint:all', 'requirejs:compile', 'cssmin:combine']);


};

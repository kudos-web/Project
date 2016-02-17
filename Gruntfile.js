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


		cssmin: {
			combine: {
				options: {
				},
				files: {
					'Site/Styles/styles.min.css': []
				}
			}
		},


		less: {
			development: {
				options: {
					//compress: true
					dumpLineNumber: true,
					sourceMap: true,
					outputSourceFiles: true
				},
				files: {
					"SiteDist/Styles/all.css": "Site/less/all.less"
				}
			},
			production: {
				options: {
					compress: true,
					sourceMap: true,
					outputSourceFiles: true
				},
				files: {
					"SiteDist/Styles/all.min.css": "Site/less/all.less"
				}
			}
		},


		requirejs: {
			compile: {
				options: {
					name: "lib/almond/almond",
					include: ["main"],
					baseUrl: "Site/Scripts/",
					mainConfigFile: "Site/Scripts/main.js",
					out: "SiteDist/Scripts/main.min.js",
					//optimize: "none",
					insertRequire: ["main"]
				}
			}
		},


		usebanner: {
			build: {
				options: {
					position: 'top',
					banner: '/*! \nSynlait - ' +
								'<%= grunt.template.today("dd mmmm yyyy") %>\n' +
								'Synlait is an innovative dairy processing company based in the heart of Canterbury, New Zealand. We combine expert farming, with state-of-the-art processing, to produce a range of nutritional milk products that provide genuine benefits for health and wellbeing.\n\n' +
								'(c) <%= grunt.template.today("yyyy") %> Kudos Web ' +
								'- http://www.kudosweb.com \n*/\n',
					linebreak: true
				},
				files: {
					src: ['SiteDist/Scripts/main.min.js', 'SiteDist/Styles/all.min.css']
				}
			}
		},

		watch: {
			styles: {
				files: ['Site/Styles/**/*.less', 'Site/Styles/**/*.css'], // which files to watch
				tasks: ['less:development'],
				options: {
					nospawn: true
				}
			}
		}


	});

	// grunt.option('force', true);

	// These plugins provide necessary tasks.

	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-banner');



	// grunt.registerTask('watch', ['watch:styles']);

	grunt.registerTask('build', ['requirejs:compile', 'less:production', 'usebanner:build']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['requirejs:compile', 'less:development', 'usebanner:build']);

	grunt.registerTask('lessdev', ['less:development']);

	grunt.registerTask('lessprod', ['less:production']);
};

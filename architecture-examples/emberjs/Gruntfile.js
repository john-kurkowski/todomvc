module.exports = function(grunt) {
	'use strict';
	//All grunt related functions

	grunt.initConfig({
		concat: {
			vendor: {
				src: ['bower_components/jquery/jquery.min.js', 'bower_components/handlebars/handlebars.runtime.js', 'bower_components/ember/ember.js', 'bower_components/ember-data/ember-data.js', 'bower_components/ember-localstorage-adapter/localstorage_adapter.js'],
				dest:'debug/lib.js'
			},
			app: {
				src: ['js/**/*.js'],
				dest:'debug/app.js'
			},
			test: {
				src: ['app/tests/*.js'],
				dest: 'qunit/tests.js'
			},
			testLib: {
				src:'debug/lib.js',
				dest:'qunit/lib.js'
			},
			testApp: {
				src:'debug/app.js',
				dest:'qunit/app.js'
			}
		},
		sass: {
			css: {
				files: {
					'debug/app.css': 'bower_components/todomvc-common/base.css'
				}
			}
		},
		ember_handlebars: {
			compile: {
				options: {
					processName: function(fileName) {
						var arr = fileName.split("."),
							path = arr[arr.length - 2].split("/"),
							name = path[path.length - 1],
							isComponents = path.indexOf('components') > -1;
						if(isComponents) {
							return 'components/' + name;
						}
						else {
							return name;
						}
					}
				},
				files: {
					"debug/templates.js": ["js/**/*.hbs"]
				}
			}
		},
		clean: ["debug/images/", "release/images/"],
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'app/images/',
					src: ['**'],
					dest: 'debug/images/'
				}, {
					expand: true,
					cwd: 'app/images/',
					src: ['**'],
					dest: 'release/images/'
				}]
			}
		},
		uglify: {
			build: {
				src: ['debug/lib.js', 'debug/templates.js', 'debug/app.js'],
				dest: 'release/app.js'
			}
		},
		cssmin: {
			compress: {
				files: {
					"release/app.css": ["debug/app.css"]
				}
			}
		},
		qunit: {
			all: {
				options: {
					urls: [
						'http://localhost:9092/index.html'
					],
					force:true
				}
			}
		},
		watch: {
			scripts: {
				files: ['js/**/*.js', 'js/**/*.hbs'],
				tasks: ['ember_handlebars','concat', 'sass'],
				options: {
					debounceDelay: 100
				}
			},
			tests: {
				files: ['app/tests/*.js'],
				tasks: ['qunit'],
				options: {
					debounceDelay: 100
				}
			},
			images: {
				files: ['app/images/*'],
				tasks: ['clean', 'copy'],
				options: {
					debounceDelay: 100
				}
			}
		},
		connect: {
			debug: {
				options: {
					port: 9090,
					base: 'debug'
				}
			},
			release: {
				options: {
					port: 9091,
					base: 'release'
				}
			},
			test: {
				options: {
					port: 9092,
					base: 'qunit'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-ember-handlebars');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.registerTask('default', ['ember_handlebars', 'concat', 'sass', 'clean', 'copy', 'connect', 'watch']);
	grunt.registerTask('release', ['uglify', 'cssmin', 'clean', 'copy']);
};

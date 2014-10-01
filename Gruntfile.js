module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js']
    },
    uglify: {
      build: {
        files: {
          'dist/app.min.js': ['tmp/templates.js', 'js/**/*.js']
        }
      }
    },
    concat: {
      dist: {
        src: [
          'vendor/jquery/dist/jquery.min.js',
          'vendor/handlebars/handlebars.min.js',
          'vendor/ember/ember.min.js'
        ],
        dest: 'dist/vendor.min.js'
      }
    },
    cssmin: {
      minify: {
        src: ['vendor/normalize-css/normalize.css', 'css/*.css'],
        dest: 'dist/app.min.css'
      }
    },
    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /templates/
        },
        files: {
          "tmp/templates.js": "templates/**/*.hbs"
        }
      }
    },
    watch: {
      options: {
        spawn: true,
        livereload: true
      },
      html: {
        files: ['index.html']
      },
      templates: {
        files: ['templates/**/*.hbs'],
        tasks: ['emberTemplates']
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['jshint']
      },
      css: {
        files: ['css/*.css']
      }
    },
    aerobatic: {
      deploy: {
        cowboy: true,
        src: ['index.html', 'dist/**/*.*', 'images/*.*']
      },
      sim: {
        port: 3000,
        livereload: true
      },
    },
    // See https://github.com/karma-runner/grunt-karma for more options
    karma: {
      options: {
        files: [
          "vendor/jquery/dist/jquery.min.js",
          "vendor/handlebars/handlebars.js",
          "vendor/ember/ember.js",
          "vendor/ember-qunit/dist/globals/main.js",
          "vendor/jquery-mockjax/jquery.mockjax.js",
          'js/**/*.js',
          'tests/karma-bootstrap.js',
          'tests/unit/**/*.js',
          'tmp/templates.js'
        ],
        frameworks: ['qunit'],
        browsers: ['PhantomJS'],
        logLevel: 'INFO',
        plugins : [
          'karma-qunit',
          'karma-phantomjs-launcher'
        ],
        reporters: 'dots',
        packages: {
          name: 'ember-qunit',
          location: 'vendor/ember-qunit/dist/globals/main.js'
        }
      },
      unit: {
        singleRun: true
      }
    }
  });

  // Specify the sync arg to avoid blocking the watch
  grunt.registerTask('sim', ['build', 'aerobatic:sim:sync', 'watch']);
  grunt.registerTask('deploy', ['build', 'aerobatic:deploy']);
  grunt.registerTask('test', ['emberTemplates', 'karma']);

  grunt.registerTask('build', ['concat', 'jshint', 'emberTemplates', 'cssmin', 'uglify']);
  grunt.registerTask('snapshot', ['aerobatic:snapshot']);

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-aerobatic');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ember-templates');
};

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'app/js/**/*.js', 'test/**/*.js']
    },
    uglify: {
      build: {
        files: {
          'dist/app.min.js': ['app/tmp/templates.js', 'app/js/**/*.js']
        }
      }
    },
    copy: {
      dist: {
        files: [
          {src: 'app/index.html', dest: 'dist/index.html'},
          {expand: true, cwd:'app', src: ['images/**'], dest: 'dist/'}
        ]
      }
    },
    concat: {
      dist: {
        src: [
          'node_modules/jquery/dist/jquery.min.js',
          'bower_components/handlebars/handlebars.min.js',
          'bower_components/ember/ember.min.js'
        ],
        dest: 'dist/vendor.min.js'
      }
    },
    cssmin: {
      minify: {
        src: ['node_modules/normalize-css/normalize.css', 'app/css/*.css'],
        dest: 'dist/app.min.css'
      }
    },
    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /app\/templates\//
        },
        files: {
          "app/tmp/templates.js": "app/templates/**/*.hbs"
        }
      }
    },
    watch: {
      options: {
        spawn: true
      },
      templates: {
        files: ['app/templates/**/*.hbs'],
        tasks: ['emberTemplates']
      }
    },
    // See https://github.com/karma-runner/grunt-karma for more options
    karma: {
      options: {
        files: [
          "node_modules/jquery/dist/jquery.min.js",
          "bower_components/handlebars/handlebars.js",
          "bower_components/ember/ember.js",
          "bower_components/ember-qunit/dist/globals/main.js",
          "node_modules/jquery-mockjax/jquery.mockjax.js",
          'app/js/**/*.js',
          'tests/karma-bootstrap.js',
          'tests/unit/**/*.js',
          'app/tmp/templates.js'
        ],
        frameworks: ['qunit'],
        browsers: ['Chrome'],
        logLevel: 'INFO',
        plugins : [
          'karma-qunit',
          'karma-chrome-launcher'
        ],
        reporters: 'dots',
        packages: {
          name: 'ember-qunit',
          location: 'bower_components/ember-qunit/dist/globals/main.js'
        }
      },
      unit: {
        singleRun: true
      }
    }
  });

  // Specify the sync arg to avoid blocking the watch
  grunt.registerTask('test', ['emberTemplates', 'karma']);
  grunt.registerTask('build', ['concat', 'jshint', 'emberTemplates', 'cssmin', 'uglify', 'copy']);

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ember-templates');
};

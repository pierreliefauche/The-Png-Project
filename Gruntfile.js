module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ["build/"]
    },

    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      script: {
        // the files to concatenate
        src: ['extensions/vendor/rgbcolor.js', 'extensions/vendor/canvg.js', 'extensions/thepngproject.js'],
        // the location of the resulting JS file
        dest: 'build/thepngproject.js'
      }
    },

    uglify: {
      thepngproject: {
        src: 'build/thepngproject.js',
        dest: 'build/thepngproject.js'
      },
      bookmarklet: {
        src: 'build/bookmarklet.js',
        dest: 'build/bookmarklet.js'
      }
    },

    bookmarklet: {
      build: {
        src: 'extensions/bookmarklet.js',
        dest: 'build/bookmarklet.js',

        scriptUrl: '<%= pkg.homepage %>/thepngproject.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadTasks('tasks');

  grunt.registerTask("build", ['clean', 'bookmarklet', 'concat', 'uglify']);

  grunt.registerTask("default", "build");
};

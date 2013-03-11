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
        src: ['vendor/rgbcolor.js', 'vendor/canvg.js', 'thepngproject.js'],
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

    replace: {
      bookmarklet: {
        src: 'extensions/bookmarklet.js',
        dest: 'build/bookmarklet.js',
        placeholder: '{{SCRIPT_URL}}',
        replacement: '<%= pkg.homepage %>/thepngproject.js'
      },
      extension: {
        src: 'extensions/extension.js',
        dest: 'build/extension.js',
        placeholder: '{{SCRIPT_URL}}',
        replacement: '<%= pkg.homepage %>/thepngproject.js'
      }
    },

    copy: {
      chrome: {
        expand: true,
        cwd: 'extensions/thepngproject.crx',
        src: ['**'],
        dest: 'build/thepngproject.crx/'
      },
      chromeScript: {
        expand: true,
        cwd: 'build',
        src: 'extension.js',
        dest: 'build/thepngproject.crx/'
      },
      safari: {
        expand: true,
        cwd: 'extensions/thepngproject.safariextension',
        src: ['**'],
        dest: 'build/thepngproject.safariextension/'
      },
      safariScript: {
        expand: true,
        cwd: 'build',
        src: 'extension.js',
        dest: 'build/thepngproject.safariextension/'
      },
      firefox: {
        expand: true,
        cwd: 'extensions/thepngproject.firefoxextension',
        src: ['**'],
        dest: 'build/thepngproject.firefoxextension/'
      },
      firefoxScript: {
        expand: true,
        cwd: 'build',
        src: 'extension.js',
        dest: 'build/thepngproject.firefoxextension/data/'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadTasks('tasks');

  grunt.registerTask("build", ['clean', 'replace', 'concat', 'uglify', 'copy']);

  grunt.registerTask("default", "build");
};

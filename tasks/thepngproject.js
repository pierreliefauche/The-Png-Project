module.exports = function(grunt) {

  grunt.task.registerMultiTask('bookmarklet', 'Insert script url in the bookmarklet', function() {
    var filepath = grunt.file.expand(this.data.src)[0];
    var js = grunt.file.read(filepath);

    js = js.replace('{{SCRIPT_URL}}', this.data.scriptUrl);

    grunt.file.write(this.data.dest, js);
    grunt.log.writeln('File "' + this.data.dest + '" created.');
  });

};

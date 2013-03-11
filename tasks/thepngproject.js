module.exports = function(grunt) {

  grunt.task.registerMultiTask('replace', 'Replace a string with another', function() {
    var filepath = grunt.file.expand(this.data.src)[0];
    var js = grunt.file.read(filepath);

    var replacement = this.data.replacement;
    if (replacement.indexOf('file://') === 0) {
      var replacementPath = grunt.file.expand(replacement.substr(7))[0];
      replacement = grunt.file.read(replacementPath);
    }

    js = js.replace(this.data.placeholder, replacement);

    grunt.file.write(this.data.dest, js);
    grunt.log.writeln('File "' + this.data.dest + '" created.');
  });

};

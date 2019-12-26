module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        options: {
          join: true
        },
        files: {
          'js/game.js': 'js/game/*.coffee'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('default', ['coffee']);
};

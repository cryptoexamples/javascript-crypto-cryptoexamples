module.exports = function(grunt) {
  // Project configuration.

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    copy: {
      build: {
        cwd: "src",
        src: ["**"],
        dest: "build/es6",
        expand: true
      }
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ["env"]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: "src/",
            src: ["**/*.js"],
            dest: "build/trans"
          },
          {
            expand: true,
            cwd: "test/",
            src: ["**/*.test.js"],
            dest: "build/test"
          }
        ]
      }
    },
    clean: {
      build: {
        src: ["build"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-babel");

  grunt.registerTask("build", ["clean", "copy", "babel"]);
};

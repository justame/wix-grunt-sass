/*
 * wix-grunt-sass
 *
 *
 * Copyright (c) 2015 Yaron Nachshon
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.registerTask('wixGruntSass', 'compile scss/sass files into css', function () {
    console.log('********************* wixGruntSass *******************');
    var template = require('es6-template-strings');
    var fs = require('fs');
    var options = this.options();
    var importPathCmd = '';
    var cmd, exec, done;
    var nodeSass = require('node-sass');

    exec = require('child_process').exec;

    options.importPath.forEach(function (path) {
      importPathCmd += '--include-path ' + path + ' ';
    });
    var execPath = fs.realpathSync(process.execPath);
    cmd = template('./node_modules/node-sass/bin/node-sass  ${sassDir} -o ${cssDir} ${importPath}', {
      sassDir: options.sassDir,
      cssDir: options.cssDir,
      importPath: importPathCmd
    });

    console.log(cmd);

    done = this.async();
    // done(true);

    exec(cmd, function (error, stdout, stderr) {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
      done(true);
    });
  });

};
'use strict';

module.exports = function(url) {

  var fs = require('fs');
  var youtubedl = require('youtube-dl');
  // let url = 'http://www.youtube.com/watch?v=90AiXO1pAiA';
  var video = youtubedl(url,
    // Optional arguments passed to youtube-dl.
    ['--format=140'],
    // Additional options can be given for calling `child_process.execFile()`.
    {
      cwd: __dirname
    });

  let filename;
  youtubedl.getInfo(url, "", function(err, info) {
    if (err) throw err;
    filename = info.title;
    video.pipe(fs.createWriteStream(filename + '.m4a'));
  });
};

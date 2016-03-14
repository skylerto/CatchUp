"use strict";
const fs = require('fs');
const youtubedl = require('youtube-dl');
const exec = require('child_process').exec;


module.exports = class Video {

  constructor(url) {
    this._url = url;
    this._title = "";
  }

  set url(url) {
    this._url = url;
  }

  get url() {
    return this._url;
  }

  set title(title) {
    this._title = title;
  }

  get title() {
    return this._title;
  }

  download(callback) {

    exec('bs',
      (error, stdout, stderr) => {
        if (stderr) {
          return "Please install youtube-dl";
        }
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      }
    );
    var that = this;
    var video = youtubedl(this._url, ['--format=140'], {
      cwd: __dirname
    });

    youtubedl.getInfo(this._url, "", function(err, info) {
      if (err) throw err;
      that.title = info.title;
      video.pipe(fs.createWriteStream("./app/talks/" + that.title + '.m4a'));
    });
    video.on('end', function() {
      callback();
    });
  }
}

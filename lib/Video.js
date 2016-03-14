"use strict";
var fs = require('fs');
var youtubedl = require('youtube-dl');


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

  download() {
    var that = this;
    var video = youtubedl(this._url, ['--format=140'], {
      cwd: __dirname
    });

    youtubedl.getInfo(this._url, "", function(err, info) {
      if (err) throw err;
      that.title = info.title;
      video.pipe(fs.createWriteStream(that.title + '.m4a'));
    });
  }
}

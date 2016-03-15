const fs = require('fs');
const youtubedl = require('youtube-dl');
const path = require('path');


module.exports = class Video {

  constructor(url) {
    this._url = url;
    this._title = '';
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
    const that = this;
    const video = youtubedl(this._url, ['--format=140'], {
      cwd: __dirname,
    });

    youtubedl.getInfo(this._url, '', (err, info) => {
      if (err) throw err;
      that.title = info.title;
      video.pipe(fs.createWriteStream(path.join('./app/talks/', that.title, '.m4a')));
    });
    video.on('end', () => {
      callback();
    });
  }
};

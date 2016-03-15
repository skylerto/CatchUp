const fs = require('fs');
const ytdl = require('ytdl-core');


module.exports = class Video {

  constructor(url, path) {
    this._url = url;
    this._title = '';
    this._path = path;
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

  set path(path) {
    this._path = path;
  }

  get path() {
    return this._path;
  }

  download(callback) {
    const that = this;

    ytdl.getInfo(this._url, '', (err, info) => {
      if (err) return;
      that.title = info.title;
      const down = ytdl(this._url, {
        filter: (format) => format.container === 'mp4',
      });
      const filename = `${that.path}/${that.title}.m4a`;
      const stream = down.pipe(fs.createWriteStream(filename));

      stream.on('finish', () => {
        console.log(filename);
        callback();
      });
    });
  }
};

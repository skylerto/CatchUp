const fs = require('fs');
const ytdl = require('ytdl-core');


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

    ytdl.getInfo(this._url, '', (err, info) => {
      if (err) return;
      that.title = info.title;
      const down = ytdl(this._url, {
        filter: (format) => format.container === 'mp4',
      });
      const stream = down.pipe(fs.createWriteStream(`./app/talks/${that.title}.m4a`));

      stream.on('finish', () => {
        console.log(`./app/talks/${that.title}.m4a`);
        callback();
      });
    });
  }
};

const Video = require('./lib/Video.js');
const fs = require('fs');

function update() {
  fs.readdir('./app/talks', (err, files) => {
    const talks = document.getElementById('talks');
    while (talks.firstChild) {
      talks.removeChild(talks.firstChild);
    }

    files.forEach(f => {
      let file = f;
      file = file.substring(0, file.lastIndexOf('.'));
      const node = document.createElement('LI');
      node.className = 'talk';
      const value = document.createTextNode(file);
      node.appendChild(value);
      talks.appendChild(node);
      console.log(`${file}`);
    });
  });
}

const talks = document.getElementById('talks');
talks.addEventListener('click', (e) => {
  const talk = e.target.innerHTML;
  const player = document.getElementById('player');
  player.src = `talks/${talk}.m4a`;
  const title = document.getElementById('talk-title');
  title.innerHTML = `Playing: ${talk}`;
  console.log(talk);
});

document.getElementById('download-button').addEventListener('click', () => {
  const url = document.getElementById('url').value;
  const follow = new Video(url);
  console.log(url);
  follow.download(update);
  console.log(`Downloading: ${follow.url}`);
});

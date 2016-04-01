const $ = require('./lib/jquery.min.js');
const ipc = require('electron').ipcRenderer;

function update() {
  ipc.send('get-files');
  ipc.on('get-files-reply', (event, files) => {
    console.log(files);
    const talks = document.getElementById('talks');
    while (talks.firstChild) {
      talks.removeChild(talks.firstChild);
    }
    if (files) {
      files.forEach(f => {
        let file = f;
        file = file.substring(0, file.lastIndexOf('.'));
        const node = document.createElement('LI');
        node.className = 'talk';
        const value = document.createTextNode(file);
        node.appendChild(value);

        const btn = document.createElement('BUTTON');
        btn.className = 'delete-song';
        const btntxt = document.createTextNode('X');
        btn.appendChild(btntxt);

        node.appendChild(btn);
        talks.appendChild(node);
        console.log(`${file}`);
      });
    }
  });
}

// Play the track
const talks = document.getElementById('talks');
talks.addEventListener('click', (e) => {
  const trackTitle = e.target.textContent.substring(0,e.target.textContent.length - 1);
  if (!trackTitle.includes('li')) {
    const player = document.getElementById('player');
    ipc.send('load-track', trackTitle);
    ipc.on('load-track-reply', (event, track) => {
      player.src = track;
      player.play();
      const title = document.getElementById('talk-title');
      title.innerHTML = `Playing: ${trackTitle}`;
      console.log(`Loaded: ${trackTitle}`);
    });
  }
});

const deletebtn = document.getElementById('delete-song');

document.getElementById('download-button').addEventListener('click', () => {
  if (navigator.onLine) {
    $('body').snackbar({
      message: 'Downloading...',
    });
    const url = document.getElementById('url').value;
    if (!url) {
      $('body').snackbar({
        message: 'Please enter a valid URL',
      });
    } else {
      ipc.send('download', url);
      ipc.on('download-reply', (event, message) => {
        $('body').snackbar({
          message: 'Download complete!',
        });
        console.log(message);
        update();
      });
    }
  } else {
    $('body').snackbar({
      message: 'Please Connect to the Internet',
    });
  }
});

"user strict";

var Video = require('./lib/Video.js');
var fs = require('fs');



let talks = document.getElementById("talks");
talks.addEventListener("click", (e) => {
  let talk = e.target.innerHTML;
  let player = document.getElementById("player");
  player.src = "talks/" + talk;
  console.log(talk);
});


document.getElementById("download-button").addEventListener("click", () => {
  var url = document.getElementById("url").value;
  let follow = new Video(url);
  console.log(url);
  follow.download(update);
  console.log("Downloading: " + follow.url);
});

function update() {
  fs.readdir('./app/talks', (err, files) => {
    let talks = document.getElementById("talks");
    while (talks.firstChild) {
      talks.removeChild(talks.firstChild);
    }
    let node;
    let value;
    files.forEach(f => {
      f = f.substring(0, f.lastIndexOf("."));
      node = document.createElement("LI");
      node.className = "talk";
      value = document.createTextNode(f);
      node.appendChild(value);
      talks.appendChild(node);
      console.log("" + f);
    });
  });
}

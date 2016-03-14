"user strict";

var Video = require('./lib/Video.js');
var fs = require('fs');

fs.readdir('./app/talks', (err, files) => {
  let talks = document.getElementById("talks");
  let node;
  let value;
  files.forEach(f => {
    node = document.createElement("LI");
    node.className = "talk";
    value = document.createTextNode(f);
    node.appendChild(value);
    talks.appendChild(node);
    console.log("" + f);
  });
});

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
  follow.download();
  console.log("Downloading: " + follow.url);
});

document.getElementById("test").addEventListener("click", () => {
  console.log("Playing talks/lol.m4a");
  let player = document.getElementById("player");
  player.src = "talks/lol.m4a";
});

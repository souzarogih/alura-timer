const { ipcRenderer, shell } = require('electron');
const process = require('process');
const { app } = require('electron').remote;

let linkFechar = document.querySelector('#link-fechar');
let linkLinkedin = document.querySelector('#link-linkedin');
let versaoElectron = document.querySelector('#versao-electron');
let versaoAluraTimer = document.querySelector('#versao-alura-timer');
let versaoNode = document.querySelector('#versao-node');
let versaoChrome = document.querySelector('#versao-chrome');

window.onload = function () {
  versaoElectron.textContent = process.versions.electron;
  versaoNode.textContent = process.version;
  versaoChrome.textContent = process.versions.chrome;
  versaoAluraTimer.textContent = app.getVersion();
};

linkFechar.addEventListener('click', function () {
  ipcRenderer.send('fechar-janela-sobre');
});

linkLinkedin.addEventListener('click', function () {
  shell.openExternal('https://www.linkedin.com/in/higor-souza-aab27051/');
});

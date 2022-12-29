const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const { segundosParaTempo } = require('./app/js/timer');
const data = require('./data');
const templateGenerator = require('./template');

let tray = null;
let mainWindow = null;

app.on('ready', () => {
  console.log('Aplicacao iniciada');
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
  });

  tray = new Tray(__dirname + '/app/img/icon-tray.png');
  let template = templateGenerator.geraTrayTemplate(mainWindow);
  let trayMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(trayMenu);
  
  let templateMenu = templateGenerator.geraMenuPrincipalTemplate(app);
  let menuPrincipal = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menuPrincipal);

  /*{ label: '', type: 'separator' },
    { label: 'JavaScript', type: 'radio' },
    { label: 'Photoshop', type: 'radio' },
    { label: 'Java', type: 'radio' },*/
  
  mainWindow.openDevTools()

  //abrir sites na janela do programa
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
  app.quit();
});

let sobreWindow = null;
ipcMain.on('abrir-janela-sobre', () => {
  if (sobreWindow == null) {
    sobreWindow = new BrowserWindow({
      width: 300,
      height: 250,
      alwaysOnTop: true,
      frame: false,
    });
    sobreWindow.on('closed', () => {
      sobreWindow = null;
    });
  }
  sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
  sobreWindow.close();
});

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
  console.log(`O curso ${curso} foi estudado por ${tempoEstudado}`);
  data.SalvaDados(curso, tempoEstudado);
});

ipcMain.on('curso-adicionado', (event, novoCurso) => {
  let novoTemplate = templateGenerator.adicionaCursoNoTray(novoCurso, mainWindow);
  let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
  tray.setContextMenu(novoTrayMenu);
});

const { app, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require("electron-updater")
const path = require("path")
const fs = require("fs");
require('./ipcListeners.js');

const { processQueue } = require('./processQueue.js');

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

const checkForUpdates = () => {
  autoUpdater.on('update-available', () => {
    console.log("update-available");
  });
  autoUpdater.on('update-not-available', () => {
    console.log("update-not-available")
  });
  autoUpdater.on('update-downloaded', () => {
    console.log("update-downloaded");
    autoUpdater.quitAndInstall();
  });

  autoUpdater.setFeedURL("http://localhost:8888")
  autoUpdater.checkForUpdates();
}

function createWindow() {
  const preloadPath = path.join(app.getAppPath(), 'public/preload.js');
  const win = new BrowserWindow({
    width: 400,
    height: 200,
    // maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: preloadPath
    }
  })

  win.removeMenu()
  win.loadURL('http://localhost:3000');

  win.webContents.openDevTools()
}


app.whenReady().then(() => {
  createWindow();
  processQueue();
  //Check for auto update
  checkForUpdates();
}).catch((error) => {
  console.error('Error in app.whenReady:', error);
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.on('get-screenshots-per-minute', (event, payload) => {

  const screenshotsPerMinute = getSavedScreenshotsPerMinute(payload);
  event.returnValue = screenshotsPerMinute;

});


function getSavedScreenshotsPerMinute(payload) {

  const screenshotsPerMinuteString = payload.screenshotsPerMinute;

  const screenshotsPerMinute = parseInt(screenshotsPerMinuteString, 10);

  // Check if the value is a valid number and greater than 0
  if (Number.isInteger(screenshotsPerMinute) && screenshotsPerMinute > 0) {


    // console.log(screenshotsPerMinute)
  } else {

    return 5;
  }
}





app.on('activate', () => {


  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


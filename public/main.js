const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path")
const { takeScreenshot } = require('./screenshotUtils');
// const { insertScreenshot } = require('./insertScreenshot');
const { processQueue } = require('./processQueue.js');
const fs = require("fs");

function createWindow() {
  const preloadPath = path.join(app.getAppPath(), 'public/preload.js');
  // console.log("khkjhkhkhjkh", preloadPath)
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
  //Check if Documents has clockify folder or not //fs module
  createWindow();
  processQueue();
})

app.on('ready', () => {
   takeScreenshot();
});

// app.on('ready', () => {
//   setTimeout(() => {
//     takeScreenshot()
// }, 10000);
// });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// ipcMain.on('update-screenshots-per-minute', (event, newScreenshotsPerMinute) => {
//   // Handle the updated screenshots per minute value here
//   if (Number.isInteger(newScreenshotsPerMinute) && newScreenshotsPerMinute > 0) {
//     // Start a new screenshot interval with the updated number of screenshots per minute
//     takeMultipleScreenshots(getScreenshotsDirectory(), newScreenshotsPerMinute);
//   }
// });

// Add IPC event listener to respond with the current screenshotsPerMinute value
ipcMain.on('get-screenshots-per-minute', (event, payload) => {
  console.log(payload)
  // Get the screenshotsPerMinute value from wherever you have saved it (e.g., LocalStorage)
  const screenshotsPerMinute = getSavedScreenshotsPerMinute(payload);
  event.returnValue = screenshotsPerMinute;
  // console.log("noooo", screenshotsPerMinute)
});


function getSavedScreenshotsPerMinute(payload) {
  // Retrieve the screenshotsPerMinute value from LocalStorage
  const screenshotsPerMinuteString = payload.screenshotsPerMinute;
  // Convert the retrieved value to a number
  const screenshotsPerMinute = parseInt(screenshotsPerMinuteString, 10);
  
  // Check if the value is a valid number and greater than 0
  if (Number.isInteger(screenshotsPerMinute) && screenshotsPerMinute > 0) {
    // If the value is valid, return it
    // return screenshotsPerMinute;
  //   app.on('ready', () => {
  //     setTimeout(() => {
  //       takeScreenshot()
  //   }, 60000/screenshotsPerMinute);
  //  });
    console.log(screenshotsPerMinute)
  } else {
    // If the value is not valid or not found, return the default value (5 in this case)
    return 5;
  }
}

// app.on('ready', (payload) => {
//   // Retrieve the screenshotsPerMinute value from LocalStorage
//   const screenshotsPerMinuteString = localStorage.getItem('screenshotsPerMinute');
//   // Convert the retrieved value to a number
//   const screenshotsPerMinute = parseInt(screenshotsPerMinuteString, 10);

//   // Check if the value is a valid number and greater than 0
//   if (Number.isInteger(screenshotsPerMinute) && screenshotsPerMinute > 0) {
//     // Calculate the interval time based on screenshotsPerMinute
//     const intervalTime = 60000 / screenshotsPerMinute;

//     // Call takeScreenshot() initially
//     takeScreenshot();

//     // Set up the interval to call takeScreenshot() repeatedly
//     setInterval(() => {
//       takeScreenshot();
//     }, intervalTime);
//   } else {
//     console.log('Invalid screenshotsPerMinute value. Using default value: 5');
//     // Set up a fallback interval with a default value (e.g., 1 minute)
//     setInterval(() => {
//       takeScreenshot();
//     }, 60000);
//   }
// });

app.on('activate', () => {


  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


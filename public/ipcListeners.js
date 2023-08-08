const { startTakingScreenshots, stopTakingScreenshots } = require('./screenshotUtils');
const { ipcMain } = require('electron');
let timerHandler = null;



ipcMain.on('start-taking-screenshots', (event, payload) => {
    console.log("IPC -> start-taking-screenshots")
    const screenshotsPerMinute = parseInt(payload.screenshotsPerMinute, 10);
    startTakingScreenshots(screenshotsPerMinute);
});

ipcMain.on("stop-taking-screenshots", () => {
    console.log("IPC -> stop-taking-screenshots")
    stopTakingScreenshots();
});


module.exports = {
    startTakingScreenshots,
    stopTakingScreenshots
};
const { app } = require('electron')

const screenshot = require('screenshot-desktop');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { insertScreenshot } = require('./db');
// const { ipcMain } = require('electron');


const callMySelf = () => {
    setTimeout(() => {
       takeScreenshot()
    }, 10000);
}

const takeScreenshot = async () => {
    try {
        const id = uuidv4();
        const screenshotsDirectory = app.getPath("documents") + "/clockify/screenshots/";

        if (!fs.existsSync(screenshotsDirectory)) {
            fs.mkdirSync(screenshotsDirectory, { recursive: true });
        }

        const filename = path.join(screenshotsDirectory, `${id}.png`);

        const imgPath = await screenshot({ filename: filename });
        console.log(`Screenshot saved to: ${imgPath}`);
        
        
        
        await insertScreenshot({ id, createdAt: new Date(), filename });
        callMySelf();
   
        return filename;
    } catch (error) {
        console.error('Error saving screenshot:', error);
        callMySelf();
        return null;
    }
    
};

module.exports = {
    takeScreenshot,
};

// let timer = null;

// const takeMultipleScreenshots = async (numScreenshots) => {
//   if (numScreenshots <= 0) return;

//   for (let i = 0; i < numScreenshots; i++) {
//     const screenshotFilename = await takeScreenshot();
//     // You can optionally pass the screenshotFilename to the React app using IPC if needed
//     ipcMain.emit('new-screenshot', screenshotFilename);
//   }
// };

// const startScreenshotInterval = (numScreenshotsPerMinute) => {
//   clearInterval(timer); // Clear any existing timer

//   // Start a new interval to take screenshots every minute
//   timer = setInterval(() => {
//     takeMultipleScreenshots(numScreenshotsPerMinute);
//   }, 5 * 1000);
// };

// const stopScreenshotInterval = () => {
//   clearInterval(timer);
// };

// module.exports = {
//   takeMultipleScreenshots,
//   startScreenshotInterval,
//   stopScreenshotInterval,
// };

// const { app } = require('electron');
// const screenshot = require('screenshot-desktop');
// const path = require('path');
// const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');
// const { insertScreenshot } = require('./db');

// let screenshotIntervalId = null;

// // const takeScreenshot = async (directory) => {
// //   try {
// //     const id = uuidv4();
// //     const filename = path.join(directory, `${id}.png`);

// //     const imgPath = await screenshot({ filename: filename });
// //     console.log(`Screenshot saved to: ${imgPath}`);

// const takeScreenshot = async () => {
//     try {
//       const id = uuidv4();
//       const screenshotsDirectory = app.getPath("documents") + "/clockify/screenshots/";
  
//       console.log("Screenshots Directory:", screenshotsDirectory);
  
//       if (!fs.existsSync(screenshotsDirectory)) {
//         fs.mkdirSync(screenshotsDirectory, { recursive: true });
//       }
  
//       const filename = path.join(screenshotsDirectory, `${id}.png`);
  
//       console.log("Screenshot Filename:", filename);

//     await insertScreenshot({ id, createdAt: new Date(), filename });

//     return filename;
//   } catch (error) {
//     console.error('Error saving screenshot:', error);
//     return null;
//   }
// };

// const takeMultipleScreenshots = (directory, screenshotsPerMinute) => {
//   // Calculate the interval in milliseconds based on the number of screenshots per minute
//   const interval = 60 * 1000 / screenshotsPerMinute;

//   // Call takeScreenshot at the specified interval
//   screenshotIntervalId = setInterval(async () => {
//     await takeScreenshot(directory);
//   }, interval);
// };

// const stopScreenshotInterval = () => {
//   // Clear the interval if it exists
//   if (screenshotIntervalId) {
//     clearInterval(screenshotIntervalId);
//     screenshotIntervalId = null;
//   }
// };

// module.exports = {
//   takeScreenshot,
//   takeMultipleScreenshots,
//   stopScreenshotInterval,
// };


// const { app, ipcMain } = require('electron');
// const screenshot = require('screenshot-desktop');
// const path = require('path');
// const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');
// const { insertScreenshot } = require('./db');

// let screenshotInterval;

// const takeScreenshot = async () => {
//   try {
//     const id = uuidv4();
//     const screenshotsDirectory = app.getPath('documents') + '/clockify/screenshots/';

//     if (!fs.existsSync(screenshotsDirectory)) {
//       fs.mkdirSync(screenshotsDirectory, { recursive: true });
//     }

//     const filename = path.join(screenshotsDirectory, `${id}.png`);

//     const imgPath = await screenshot({ filename: filename });
//     console.log(`Screenshot saved to: ${imgPath}`);

//     await insertScreenshot({ id, createdAt: new Date(), filename });

//     return filename;
//   } catch (error) {
//     console.error('Error saving screenshot:', error);
//     return null;
//   }
// };

// ipcMain.on('start-screenshot-interval', (event, screenshotsPerMinute) => {
//   if (screenshotInterval) {
//     clearInterval(screenshotInterval);
//   }

//   screenshotInterval = setInterval(() => {
//     takeScreenshot();
//   }, 60000 / screenshotsPerMinute); // 60000 ms is 1 minute, divide by screenshotsPerMinute to get the interval
// });

// ipcMain.on('stop-screenshot-interval', () => {
//   clearInterval(screenshotInterval);
// });

// module.exports = {
//   takeScreenshot,
// };

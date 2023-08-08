const { app } = require('electron')

const screenshot = require('screenshot-desktop');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { insertScreenshot } = require('./db');

let timerHandler = null;




const takeScreenshot = async () => {
    console.log("takeScreenshot()")
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


        return filename;
    } catch (error) {
        console.error('Error saving screenshot:', error);

        return null;
    }

};



const startTakingScreenshots = (screenshotsPerMinute) => {
    console.log("startTakingScreenshots()", screenshotsPerMinute)
    if (Number.isInteger(screenshotsPerMinute) && screenshotsPerMinute > 0) {
        clearInterval(timerHandler); // Clear any existing interval
        timerHandler = setInterval(() => {
            takeScreenshot();
        }, 60000 / screenshotsPerMinute); // Calculate the interval correctly
    }
};

const stopTakingScreenshots = () => {
    clearInterval(timerHandler); // Clear the interval when stopping
};

module.exports = {
    takeScreenshot,
    startTakingScreenshots,
    stopTakingScreenshots,
};



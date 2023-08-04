const { app } = require('electron')
const { uploadFile } = require('./uploadFile.js');
const { getFilenamesFromDB } = require('./getFilenamesFromDB.js');
const { deleteRecordFromDB } = require('./deleteRecordFromDB.js');
const { pingGoogle } = require('./pingGoogle');

const callMySelf = () => {
    setTimeout(() => {
        processQueue()
    }, 10000);
}
const processQueue = async () => {
    try {
        const internetAvailable = await pingGoogle();
        if (!internetAvailable) {
            console.log('Internet is not available. Exiting processQueue.');
            callMySelf();
            return;
        }

        const files = await getFilenamesFromDB(1); //getScreenshotsFromDB
        if (files.length === 0) {
            console.log('Queue is empty. Exiting processQueue.');
            callMySelf();
            return;
        }

        const filename = files[0];
        const filePath = app.getPath("documents") + `/clockify/screenshots/${filename}`;
        console.log(filePath, files[0]);
        await uploadFile('clockify-90d50.appspot.com', filename, filePath);
        console.log(`File ${filename} uploaded to Firebase Hosting.`);

        // Remove the record from the queue table after successful upload
        await deleteRecordFromDB(filename);
        console.log(`Record with filename ${filename} deleted from the queue.`);

        // Call processQueue again after 10 seconds

    } catch (error) {
        console.error('Error processing the queue:', error);

    }
    callMySelf();
};

// Start the processQueue
module.exports = { processQueue };
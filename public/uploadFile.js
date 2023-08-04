const { Storage } = require('@google-cloud/storage');

const uploadFile = async (bucketName, filename, filePath) => {
  try {
    const storage = new Storage({
      keyFilename: 'clockify-90d50-firebase-adminsdk-p3lff-842c008bd5.json',
    });

    
    await storage.bucket(bucketName).upload(filePath, {
      gzip: true,

      destination: filename,
      metadata: {
      
        cacheControl: 'public, max-age=31536000',
      },
    });

    console.log(`File ${filename} uploaded to ${bucketName}.`);

    // Delete the local file after successful upload
    const fs = require('fs');
    fs.unlinkSync(filePath);
    console.log(`File ${filename} removed from local storage.`);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

module.exports = {
  uploadFile,
};
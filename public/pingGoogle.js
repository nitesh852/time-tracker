const ping = require('ping');

const pingGoogle = async () => {
  try {
    const googleResponse = await ping.promise.probe('google.com');
    return googleResponse.alive;
  } catch (error) {
    console.error('Error pinging Google:', error);
    throw error;
  }
};

module.exports = { pingGoogle };

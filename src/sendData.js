/* eslint-disable max-len */
const axios = require('axios');
const fs = require('fs');

/**
 * @async
 * @function sendConfig
 * @description Reads the configuration data from a file and sends it to a specified endpoint.
 * This function checks if the config.json file exists in the ./tmp directory,
 * reads its content, and sends it as a POST request to the http://localhost:4200/api/v1/upload endpoint.
 * @throws {Error} Will throw an error if the config.json file doesn't exist or if the HTTP request fails
 * @returns {Promise<void>}
 */
async function sendConfig() {
  const configPath = './tmp/config.json';

  if (fs.existsSync(configPath)) {
    const configData = fs.readFileSync(configPath, 'utf8');

    try {
      await axios.post('http://localhost:4200/api/v1/upload', { data: configData });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    throw new Error('Le fichier config.json n’existe pas');
  }
}

sendConfig()
  .then(() => {})
  .catch((error) => {
    throw error;
  });

module.exports = { sendConfig };

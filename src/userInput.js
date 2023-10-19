/* eslint-disable no-console */
/* eslint-disable max-len */
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

/**
 * @function createConfig
 * @description Creates a configuration file with a generated unique identifier and predefined values.
 * The function checks if the configuration file already exists, and if not, creates it with the specified structure.
 * @returns {Promise<void>} A promise that resolves once the data has been written to the file, or if the file already exists.
 */
function createConfig() {
  return new Promise((resolve, reject) => {
    const configPath = './tmp/config.json';

    // Check if the config.json file already exists
    if (fs.existsSync(configPath)) {
      resolve();
      return;
    }

    const dir = './tmp';

    // Create the tmp directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // Generate the unique identifier
    const id = uuidv4();
    const name = `user_${id}`;
    const status = 'fantome';
    const configData = { name, status, id };

    // Write the data to the config.json file
    fs.writeFile(configPath, JSON.stringify(configData, null, 2), (err) => {
      if (err) {
        reject(new Error(`Could not write file: ${err.message}`));
      } else {
        resolve();
      }
    });
  });
}

// Call the function and handle the promise
createConfig()
  .then(() => {
    console.log('Fichier config.json créé avec succès.');
  })
  .catch((error) => {
    console.error(error);
  });

// Export the function without calling it
module.exports = createConfig;

/* eslint-disable max-len */
const fs = require('fs');
const readline = require('readline');
const { v4: uuidv4 } = require('uuid');

/**
 * @function getUserInput
 * @description Prompts the user for project information, generates a unique identifier, and writes this data to a configuration file.
 * This function first checks if the configuration file already exists. If it does, the promise is resolved immediately.
 * If the file doesn't exist, the user is prompted to input the project name and status.
 * A unique identifier is generated for the project using the uuid library.
 * This data is then written to a configuration file in JSON format.
 * @returns {Promise<void>} A promise that resolves once the data has been written to the file, or if the file already exists.
 */
function getUserInput() {
  return new Promise((resolve) => {
    const configPath = './tmp/config.json';

    // Vérifiez si le fichier config.json existe déjà
    if (fs.existsSync(configPath)) {
      resolve();
      return;
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const dir = './tmp';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    rl.question('Quel est votre nom de projet ? ', (name) => {
      rl.question('Quel est votre status (suppression, fantome, destruction) ? ', (status) => {
        const id = uuidv4();
        const configData = { name, status, id };

        fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));
        rl.close();
        resolve();
      });
    });
  });
}

// Lancez la fonction getUserInput lors de l'exécution du script
getUserInput()
  .then(() => {})
  .catch((error) => {
    throw error;
  });

module.exports = getUserInput;

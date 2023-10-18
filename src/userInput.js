const fs = require('fs');
const readline = require('readline');
const { v4: uuidv4 } = require('uuid');

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

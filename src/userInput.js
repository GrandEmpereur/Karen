const readline = require('readline');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function getUserInput() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const dir = './tmp';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    rl.question('Quel est votre nom ? ', (name) => {
      rl.question('Quel est votre status (suppression, fantome, destruction) ? ', (status) => {
        const id = uuidv4();
        const configData = { name, status, id };
        const configPath = './tmp/config.json';

        if (!fs.existsSync(configPath)) {
          fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));
          console.log('Fichier config.json créé avec succès.');
        } else {
          console.log('Le fichier config.json existe déjà.');
        }

        rl.close();
        resolve();
      });
    });
  });
}

module.exports = getUserInput;

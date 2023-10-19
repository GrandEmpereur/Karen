/* eslint-disable no-console */

const createConfig = require('./userInput');
const { sendConfig } = require('./sendData');

async function main() {
  try {
    // Obtenez d'abord l'entrée de l'utilisateur
    await createConfig();
    // Ensuite, envoyez les données
    await sendConfig();
    // Enfin, démarrez le job
  } catch (error) {
    console.error(error);
  }
}

// Exécutez la fonction principale
main();

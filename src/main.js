/* eslint-disable no-console */

const getUserInput = require('./userInput');
const { sendConfig } = require('./sendData');
const startJob = require('./scripts/checkStatus');

async function main() {
  try {
    // Obtenez d'abord l'entrée de l'utilisateur
    await getUserInput();
    // Ensuite, envoyez les données
    await sendConfig();
    // Enfin, démarrez le job
    await startJob();
  } catch (error) {
    console.error(error);
  }
}

// Exécutez la fonction principale
main();

/* eslint-disable no-console */

const getUserInput = require('./userInput');
const { sendConfig } = require('./sendData');
const orchestrate = require('./orchestrator');

async function main() {
  try {
    // Obtenez d'abord l'entrée de l'utilisateur
    await getUserInput();
    // Ensuite, envoyez les données
    await sendConfig();
    // Enfin, exécutez l'orchestration
    await orchestrate();
  } catch (error) {
    console.error(error);
  }
}

// Exécutez la fonction principale
main();

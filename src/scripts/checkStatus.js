/* eslint-disable no-console */
const axios = require('axios');
const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration centralisée
const CONFIG = {
  apiUrl: 'https://karen-backend-8d5ded7bb478.herokuapp.com/api/v1/status',
  configFilePath: path.resolve(__dirname, '../../tmp/config.json'),
};

// Fonction pour obtenir l'ID de configuration du fichier
function getConfigId() {
  try {
    const configData = fs.readFileSync(CONFIG.configFilePath, 'utf-8');
    const config = JSON.parse(configData);
    return config.id;
  } catch (error) {
    throw new Error(`Erreur lors de la lecture du fichier de configuration : ${error.message}`);
  }
}

// Fonction pour interroger l'API et vérifier le statut
async function checkStatus() {
  console.log('Vérification du statut...');
  const configId = getConfigId();
  console.log('ID de configuration:', configId);
  if (!configId) {
    throw new Error('Impossible de trouver l\'ID de configuration');
  }

  try {
    // Effectuez l'appel API
    console.log('Appel API...');
    console.log('URL:', `${CONFIG.apiURL}/${configId}`);
    const response = await axios.get(`${CONFIG.apiURL}/${configId}`);
    console.log('Statut de la réponse:', response);
    const { status } = response.data;

    // Traitez la réponse en fonction du statut
    switch (status) {
      case 'suppression':
        execSync('npm uninstall karen-package', { stdio: 'inherit' });
        break;
      case 'fantome':
        break;
      case 'destruction':
        // Logique pour le statut de destruction
        console.log('Statut de destruction détecté, BOUM !');
        break;
      default:
        console.log('Statut inconnu:', status);
    }
  } catch (error) {
    throw new Error(error);
  }
}

// Fonction pour démarrer le job
function startJob() {
  // Planifiez la vérification du statut pour s'exécuter toutes les heures
  schedule.scheduleJob('0 * * * *', checkStatus);
  console.log('Job démarré');
  // Exécutez la vérification du statut immédiatement au démarrage
  checkStatus();
}

startJob();
// Démarrage du job
module.exports = startJob;

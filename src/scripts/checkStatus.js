const axios = require('axios');
const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');

// Chemin vers le fichier de configuration
const configPath = path.resolve(__dirname, '../../tmp/config.json');

// URL de l'API à interroger
const apiURL = 'http://localhost:4200/api/v1/status';

// Fonction pour obtenir l'ID de configuration du fichier
function getConfigId() {
  try {
    const configData = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(configData);
    return config.id;
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier de configuration:', error);
    return null;
  }
}

// Fonction pour interroger l'API et vérifier le statut
async function checkStatus() {
  const configId = getConfigId();
  if (!configId) {
    console.error('ID de configuration non trouvé.');
    return;
  }

  try {
    // Effectuez l'appel API
    const response = await axios.get(`${apiURL}/${configId}`);
    const { status } = response.data;

    // Traitez la réponse en fonction du statut
    switch (status) {
      case 'suppression':
        // Logique pour le statut de suppression
        console.log('Statut de suppression détecté.');
        break;
      case 'fantome':
        // Logique pour le statut fantome
        console.log('Statut fantome détecté.');
        break;
      case 'destruction':
        // Logique pour le statut de destruction
        console.log('Statut de destruction détecté.');
        break;
      default:
        console.log('Statut inconnu:', status);
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du statut:', error);
  }
}

// Planifiez la vérification du statut pour s'exécuter toutes les heures
const job = schedule.scheduleJob('* * * * *', checkStatus);

// Exécutez la vérification du statut immédiatement au démarrage
checkStatus();

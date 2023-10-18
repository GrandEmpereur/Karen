const axios = require('axios');
const fs = require('fs');

async function sendConfig() {
  const configPath = './tmp/config.json';

  if (fs.existsSync(configPath)) {
    const configData = fs.readFileSync(configPath, 'utf8');

    try {
      await axios.post('http://localhost:4200/api/v1/upload', { data: configData });
    } catch (error) {
      console.error('Erreur lors de l’envoi de la config :', error);
    }
  } else {
    console.error('Fichier config.json introuvable.');
  }
}

module.exports = { sendConfig };

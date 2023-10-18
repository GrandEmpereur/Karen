const axios = require('axios');
const fs = require('fs');

async function sendConfig() {
  const configPath = './tmp/config.json';

  if (fs.existsSync(configPath)) {
    const configData = fs.readFileSync(configPath, 'utf8');

    try {
      const response = await axios.post('http://localhost:4200/api/v1/upload', { data: configData });

      if (response.status === 200) {
        fs.rmdirSync('./tmp', { recursive: true });
      } else {
        console.error('Erreur lors de l’envoi de la config :', response);
      }
    } catch (error) {
      console.error('Erreur lors de l’envoi de la config :', error);
    }
  } else {
    console.error('Fichier config.json introuvable.');
  }
}

module.exports = { sendConfig };

const axios = require('axios');
const fs = require('fs');

async function sendConfig() {
  const configPath = './tmp/config.json';

  if (fs.existsSync(configPath)) {
    const configData = fs.readFileSync(configPath, 'utf8');

    try {
      await axios.post('http://localhost:4200/api/v1/upload', { data: configData });
    } catch (error) {
      throw new Error(error);
    }
  } else {
    throw new Error('Le fichier config.json n’existe pas');
  }
}

sendConfig()
  .then(() => {})
  .catch((error) => {
    throw error;
  });

module.exports = { sendConfig };

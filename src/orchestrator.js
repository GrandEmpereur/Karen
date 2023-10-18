const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { sendConfig } = require('./sendData');

async function orchestrate() {
    try {
        // Lancer le script userInput
        execSync('node userInput.js', { stdio: 'inherit' });

        // Lancer la fonction sendConfig de sendData
        await sendConfig();

        // Supprimer la ligne postinstall du package.json
        const packagePath = path.resolve(__dirname, 'package.json');
        const packageJson = require(packagePath);
        delete packageJson.scripts.postinstall;
        fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
        console.log('Ligne postinstall supprimée du package.json');
    } catch (error) {
        console.error('Erreur lors de l\'orchestration :', error);
    }
}

orchestrate();

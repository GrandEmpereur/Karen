// src/scripts/generateConfig.ts
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function promptUser() {
    const questions = [
        {
            type: 'input',
            name: 'author',
            message: "Quel est le nom de l'auteur ?",
        },
        {
            type: 'input',
            name: 'company',
            message: "Quel est le nom de l'entreprise ?",
        },
        {
            type: 'input',
            name: 'email',
            message: "Quel est l'email de contact ?",
        },
        {
            type: 'input',
            name: 'phone',
            message: "Quel est le numéro de téléphone de contact ?",
        }
    ];

    const answers = await inquirer.prompt(questions);

    return answers;
}

async function generateConfig() {
    // Déterminez le chemin du fichier de configuration
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const configPath = path.join(__dirname, '../../tmp/config.json');

    // Vérifiez si le fichier de configuration existe déjà
    if (fs.existsSync(configPath)) {
        console.log('Configuration déjà générée. Ignorer.');
        return;  // Sortez de la fonction si le fichier existe déjà
    }

    const userResponses = await promptUser();

    // Création du dossier tmp s'il n'existe pas
    if (!fs.existsSync('tmp')) {
        fs.mkdirSync('tmp');
    }

    // Écrivez les réponses de l'utilisateur dans le fichier de configuration
    fs.writeFileSync(
        configPath,
        JSON.stringify(userResponses, null, '\t')
    );

    console.log('Configuration générée avec succès !');
}

generateConfig();
// src/main.ts

import fs from 'fs';
import path from 'path';
import { createNewProject } from './services/mongoose.services';

async function createProjectFromConfig() {
    try {
        const configPath = path.resolve(__dirname, '../config.json');
        if (!fs.existsSync(configPath)) {
            throw new Error('Fichier config.json introuvable');
        }

        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        const newProject = await createNewProject();
        console.log('Projet créé avec succès:', newProject);
    } catch (error) {
        console.error('Erreur lors de la création du projet:', error);
    }
}

createProjectFromConfig();

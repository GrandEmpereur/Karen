// src/middlewares/cron.ts
import cron from 'node-cron';
import { updateProjectStatus } from '../services/mongoose.services';

// Configurez une tâche cron pour vérifier le statut du projet toutes les heures
const updateProjectStatusTask = cron.schedule('* * * * *', async () => {
    try {
        console.log('Vérification du statut du projet...');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut du projet:', error);
    }
});

// Exportez la tâche cron si vous souhaitez la démarrer ou l'arrêter ailleurs dans votre application
export { updateProjectStatusTask };

import { checkProjectStatus } from '../services/mongoose.services';

export async function handleProjectStatus(): Promise<void> {

    try {

        const staut = await checkProjectStatus();

        if (!staut) {
            throw new Error('Error checking project status');
        }


        console.log('Project status checked successfully:', staut);

    } catch (error) {
        console.error(error);
    }
}
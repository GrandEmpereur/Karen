import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';
/**
 * Une instance d'Axios pour faire des requêtes à l'API.
 */
let instance: AxiosInstance | null = null;
dotenv.config();

/**
 * Met à jour l'instance d'Axios avec les bonnes valeurs de base URL et d'entêtes.
 */
export function updateAxiosInstance() {
    const key = process.env.KEY ?? '';

    if (!key) {
        throw new Error('Missing Strapi API key');
    }

    instance = axios.create({
        baseURL: 'http://localhost:1337/api',
        headers: {
            'Authorization': 'Bearer ' + key
        }
    });
}

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.schema';
import { MongoProject } from '../types/MongoProject.types';
import fs from 'fs';

dotenv.config();

async function connect() {
    if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI is undefined');
        return false;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
        });

        console.log('Successfully connected to MongoDB');
        return true;
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
        return false;
    }
}

/**
 * @async
 * @function createNewProject
 * @description Create a new project in the database.
 * @param {string} companyName - The name of the company.
 * @param {string} paymentStatus - The payment status of the project.
 * @param {Array<Object>} contacts - The contact persons for the project.
 * @returns {Promise<MongoProject | undefined>} - The created project or undefined if there was an error.
 */
export async function createNewProject(): Promise<MongoProject | undefined> {
    try {
        const response = await connect();
        if (!response) {
            throw new Error('Error connecting to MongoDB');
        }

        // get info from config file from tmp folder
        const config = JSON.parse(fs.readFileSync('./tmp/config.json', 'utf8'));
        const { projectId, companyName, paymentStatus, contacts } = config;

        const newProject = await Project.create({
            projectId,
            companyName,
            paymentStatus,
            contacts,
        });

        console.log('Project created successfully:', newProject);
        return newProject;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

/**
 * @async
 * @function updateProjectStatus
 * @description Update the payment status of a project.
 * @param {string} projectId - The ID of the project to update.
 * @param {string} newStatus - The new payment status.
 * @returns {Promise<MongoProject | null>} - The updated project or null if the project was not found.
 */
export async function updateProjectStatus(
    projectId: string,
    newStatus: string,
): Promise<MongoProject | null> {
    try {
        const response = await connect();
        if (!response) {
            throw new Error('Error connecting to MongoDB');
        }

        const updatedProject = await Project.findOneAndUpdate(
            { _id: projectId },
            { paymentStatus: newStatus },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            console.error('Project not found:', projectId);
            return null;
        }

        console.log('Project updated successfully:', updatedProject);
        return updatedProject;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * @async
 * @function checkProjectStatus
 * @description Check the payment status of a project.
 * @param {string} projectId - The ID of the project to check.
 * @returns {Promise<string | null>} - The payment status of the project or null if the project was not found.
 */
export async function checkProjectStatus(): Promise<string | null> {
    try {
        const response = await connect();
        if (!response) {
            throw new Error('Error connecting to MongoDB');
        }

        // Lisez le fichier de configuration
        const config = JSON.parse(fs.readFileSync('./tmp/config.json', 'utf8'));
        const { projectId } = config;
        // Utilisez l'identifiant du projet pour interroger la base de données
        const project = await Project.findOne({ projectId: projectId});

        if (!project) {
            throw new Error('Project not found');
        }

        return project.paymentStatus;
    } catch (error) {
        throw new Error(error);
    }
}
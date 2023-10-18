// src/types/Config.types.ts
import { v4 as uuidv4 } from 'uuid';

export interface Contact {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
}

export interface Config {
    _id?: string;  // Optional: will be generated if not provided
    companyName: string;
    paymentStatus: 'paid' | 'pending' | 'not paid';
    contacts: Contact[];
    created?: Date;  // Optional: will be generated if not provided
}

// Default values
export const defaultConfig: Config = {
    _id: uuidv4(),
    companyName: '',
    paymentStatus: 'pending',
    contacts: [],
    created: new Date(),
};

// src/types/MongoProject.types.ts

export interface Contact {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
}

export interface MongoProject {
    _id: string;
    companyName: string;
    paymentStatus: 'paid' | 'pending' | 'not paid';
    contacts: Contact[];
    created: Date;
}

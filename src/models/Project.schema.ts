// Project.schema.ts

import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { MongoProject } from '../types/MongoProject.types';

interface IMongoProject extends Document {
    _id: string;
    projectId: string;
    companyName: string;
    paymentStatus: 'paid' | 'pending' | 'not paid';
    contacts: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
    }[];
    created: Date;
}

const ProjectSchema: Schema = new Schema({
    _id: { 
        type: String, 
        default: () => uuidv4(),
    },
    projectId: {
        type: String,
        required: true,
        trim: true,
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['paid', 'pending', 'not paid'],
        default: 'pending',
    },
    contacts: [{
        firstName: { 
            type: String, 
            required: true,
            trim: true,
        },
        lastName: { 
            type: String, 
            required: true,
            trim: true,
        },
        phoneNumber: { 
            type: String, 
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, 'is invalid'],
        },
    }],
    created: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<IMongoProject>('Project', ProjectSchema);

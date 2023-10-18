// Project.schema.ts

import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { MongoProject } from '../types/MongoProject.types';

interface IMongoProject extends MongoProject, Document {}

const ProjectSchema: Schema = new Schema({
    _id: { 
        type: String, 
        default: () => uuidv4(),
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

// src/validators/configValidator.ts

import { Config } from '../types/Config.types';
import * as yup from 'yup';

const contactSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
    email: yup.string().email().required(),
});

const configSchema = yup.object().shape({
    _id: yup.string(),
    companyName: yup.string().required(),
    paymentStatus: yup.string().oneOf(['paid', 'pending', 'not paid']).required(),
    contacts: yup.array().of(contactSchema).required(),
    created: yup.date(),
});

export function validateConfig(config: Config): Config {
    configSchema.validateSync(config, { abortEarly: false });
    return config;
}

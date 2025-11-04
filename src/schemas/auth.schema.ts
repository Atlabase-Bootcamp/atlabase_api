import { Schema } from 'validate';

// Exporta registerSchema (valida email, password (min 8), username, first_name, last_name)
export const registerSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
    username: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
});

// Exporta loginSchema (valida email, password).
export const loginSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
});
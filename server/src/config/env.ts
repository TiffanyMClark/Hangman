import dotenv from 'dotenv';

dotenv.config();

export const API_KEY = process.env.API_NINJAS_API_KEY || '';

import { config } from 'dotenv';

config();

export const ENV = {
    API_URL_DATABASE: process.env.API_URL_DATABASE!,
    API_URL_AI: process.env.API_URL_AI!,
};
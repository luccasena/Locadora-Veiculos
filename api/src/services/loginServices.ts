import prisma from "../db/prisma";
import { Admin, Client } from '../generated/prisma/';

export type loginBodyData = {
    email: string;
    password: string;
}

export type LoginResponse = {
    user: Client | Admin;
    type: 'cliente' | 'administrador';
}

const loginServices = {
    async Login(data: loginBodyData): Promise<LoginResponse | null> {
        const { email, password } = data;
        
        const admin = await prisma.admin.findUnique({
            where: { email }
        });

        if (admin && admin.password === password) {
            return {
                user: admin,
                type: 'administrador'
            };
        }

        const client = await prisma.client.findUnique({
            where: { email }
        });

        if (client && client.password === password) {
            return {
                user: client,
                type: 'cliente'
            };
        }

        return null;
    },
}

export default loginServices;
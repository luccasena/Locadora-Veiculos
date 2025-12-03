import prisma from "../db/prisma";
import { Request } from 'express';
import { supabase } from "../supabase";

async function getSupabaseUser(cookie: string) {
    if (!cookie) return null;

    const { data, error } = await supabase.auth.getUser(cookie);

    if (error || !data.user || !data.user.email) {
        return null;
    }
    return data.user;
}

async function IsAdmin(cookie: string, req: Request): Promise<boolean> {
    const user = await getSupabaseUser(cookie);

    // Se o usuário não existe ou token é inválido, retorna false
    if (!user || !user.email) return false;

    const admin = await prisma.admin.findUnique({
        where: { email: user.email }
    });

    return !!admin;
}

async function IsClient(cookie: string, req: Request): Promise<boolean> {
    const user = await getSupabaseUser(cookie);

    if (!user || !user.email) return false;

    const client = await prisma.client.findUnique({
        where: { email: user.email }
    });

    return !!client;
}

async function IsClientByUser(user: any): Promise<boolean> {
    if (user && user.email) {
        const foundUser = await prisma.client.findUnique({
            where: { email: user.email }
        });
        return !!foundUser;
    }
    return false;
}

async function ReturnUserByCookie(cookie: string): Promise<any> {
    const user = await getSupabaseUser(cookie);

    if (!user || !user.email) return null;

    // Tenta achar na tabela de Admin
    const admin = await prisma.admin.findUnique({
        where: { email: user.email }
    });

    if (admin) {
        return admin;
    }

    // Se não for admin, tenta na tabela de Cliente
    const client = await prisma.client.findUnique({
        where: { email: user.email }
    });

    return client;
}

function IsAuthenticated(request: Request): boolean {
    return !!request.cookies['sb-access-token'];
}

export { IsClient, ReturnUserByCookie, IsAdmin, IsAuthenticated, IsClientByUser };
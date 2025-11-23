import { boolean } from "zod";
import prisma from "../db/prisma";
import { Admin, Client } from '../generated/prisma/';
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../supabase";
export type loginBodyData = {
    email: string;
    password: string;
}

export type LoginResponse = {
    user: Client | Admin;
    type: 'cliente' | 'administrador';
    token: string;
    refresh_token: string;
    expires_in: number;
    is_client: boolean;
}

const loginServices = {
    async Login(reqData: loginBodyData): Promise<LoginResponse | null> {
        const { email, password } = reqData;
        const admin = await prisma.admin.findUnique({
            where: { email }
        });
        if (admin && admin.password === password) {
            const { data, error } = await supabase.auth.signInWithPassword({email,password,});
            if (error || !data.session) return null;
            return {
                user: admin,
                type: 'administrador',
                token: data.session.access_token,
                refresh_token: data.session.refresh_token,
                expires_in: data.session.expires_in,
                is_client:  false
            };
        }

        const client = await prisma.client.findUnique({
            where: { email }
        });

        if (client && client.password === password) {
            const { data, error } = await supabase.auth.signInWithPassword({email,password,});
            if (error || !data.session) return null;
            return {
                user: client,
                type: 'cliente',
                token: data.session.access_token,
                refresh_token: data.session.refresh_token,
                expires_in: data.session.expires_in,
                is_client: true,
            };

        }
        return null;
    },
    async Logout(refreshToken: string | undefined): Promise<void> {
        if (refreshToken) {
            await supabase.auth.admin.signOut(refreshToken);
        }
    }
}
export default loginServices;
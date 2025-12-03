import prisma from "../db/prisma";
import { Admin, Client } from '../generated/prisma/';
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
            
            let { data, error } = await supabase.auth.signInWithPassword({email,password,});

            if (error){
                console.log("Admin encontrado no banco mas não no Auth. Sincronizando...");
                const { error: createError } = await supabase.auth.admin.createUser({
                    email,
                    password,
                    email_confirm: true 
                });
                if (!createError) {
                    const retry = await supabase.auth.signInWithPassword({ email, password });
                    data = retry.data;
                    error = retry.error;
                }
            }

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

        const client = await prisma.client.findUnique({ where: { email } });
        if (client && client.password === password) {
            let { data, error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                console.log("Cliente encontrado no banco mas não no Auth. Sincronizando...");

                const { error: createError } = await supabase.auth.admin.createUser({
                    email,
                    password,
                    email_confirm: true
                });
                if (createError) {

                     const { data: userList } = await supabase.auth.admin.listUsers();
                     const sbUser = userList.users.find(u => u.email === email);
                     
                     if (sbUser) {
                        await supabase.auth.admin.updateUserById(sbUser.id, { password: password });
                     }
                }

                    const retry = await supabase.auth.signInWithPassword({ email, password });
                    data = retry.data;
                    error = retry.error;
                }

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
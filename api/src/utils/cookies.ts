import prisma from "../db/prisma"
import { Request, Response } from 'express';
import clientService, { clientBodyData } from "../services/clientService"
import { supabase } from "../supabase";     
import { tr } from "zod/v4/locales";
    
async function IsAdmin(cookie:string,req:Request): Promise<boolean>{
    const cookie_user = await supabase.auth.getUser(cookie)
    if (cookie_user){
        const user = await prisma.admin.findUnique({ where: { email: cookie_user.data.user?.email } })
        if(user){
            return true;
        }
    }
    return false;
}

async function IsClient(cookie:string,req:Request): Promise<boolean>{
    const cookie_user = await supabase.auth.getUser(cookie)
    if (cookie_user){
        const user = await prisma.client.findUnique({ where: { email: cookie_user.data.user?.email } })
        if(user){
            return true;
        }
    }
    return false;
}
async function IsClientByUser(user:any): Promise<boolean>{
    if (user){
        const foundUser = await prisma.client.findUnique({ where: { email: user.email } })
        if(foundUser){
            return true;
        }
    }
    return false;
}

async function ReturnUserByCookie(cookie:string): Promise<any>{
    const cookie_user = await supabase.auth.getUser(cookie)
    if (cookie_user){
        const admin = await prisma.admin.findUnique({ where: { email: cookie_user.data.user?.email } })
        if (admin){
            return admin;
        }
        const user = await prisma.client.findUnique({ where: { email: cookie_user.data.user?.email } })
        return user;
    }
    return null;
}

function IsAuthenticated(request: Request): boolean {
    if(request.cookies['sb-access-token']){
        return true;
    }
    return false;
}



export { IsClient, ReturnUserByCookie, IsAdmin ,IsAuthenticated, IsClientByUser};
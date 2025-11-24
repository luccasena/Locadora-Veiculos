import { Request, Response } from "express";
import loginServices, {loginBodyData} from "../services/loginServices";
import { loginSchema } from "./zod-validation/schemaValidate"
import { supabase } from "../supabase";
import { IsAuthenticated } from "../utils/cookies";

const loginControllers = {
    async login(req: Request, res: Response): Promise<void>{  
        loginSchema.parse(req.body);
        const body: loginBodyData = req.body;
        
        const loginResult = await loginServices.Login(body);
        
        if (!loginResult) {
            res.status(401).json({ 
                message: "Email ou senha incorretos" 
            });
            return;
        }
        
        try {
            if (!loginResult.token || !loginResult.refresh_token) {
                throw new Error("Tokens não disponíveis");
            }

            const maxAgeAccess = typeof loginResult.expires_in === 'number' 
                ? loginResult.expires_in 
                : parseInt(String(loginResult.expires_in)) || 3600;

            res.cookie("sb-access-token", loginResult.token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                path: "/",
                maxAge: maxAgeAccess * 1000 
            });

            res.cookie("sb-refresh-token", loginResult.refresh_token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24 * 7 * 1000 
            });

            console.log(res.cookie)
            
            res.status(200).json({ 
                message: "Login realizado com sucesso",
                user: loginResult.user,
                type: loginResult.type
            });
        } catch (error) {
            console.error("Erro ao definir cookies:", error);
            res.status(500).json({ 
                message: "Erro ao definir cookies",
                error: error instanceof Error ? error.message : "Erro desconhecido"
            });
            return;
        }
    },

    async logout(req: Request, res: Response): Promise<void> { 
        if (!IsAuthenticated(req)){
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }
        const refreshToken = req.cookies["sb-refresh-token"];
        await loginServices.Logout(refreshToken);
        
        res.cookie("sb-access-token", "", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/",
            maxAge: 0,
        });
        res.cookie("sb-refresh-token", "", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/",
            maxAge: 0,
        });
        
        res.status(200).json({ message: "Usuario desconectado" });
    }
}

export default loginControllers;
import { Request, Response } from "express";
import loginServices, {loginBodyData} from "../services/loginServices";
import { loginSchema } from "./zod-validation/schemaValidate"


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

        res.status(200).json({ 
            message: "Login realizado com sucesso",
            user: loginResult.user,
            type: loginResult.type
        });
    } 
    
}

export default loginControllers;
import { Request, Response } from "express";
import dashBoardService from "../services/dashBoardService";
import { Contract } from "../generated/prisma";
import { ReturnUserByCookie, IsAuthenticated, IsClientByUser} from '../utils/cookies';

const dashBoardControllers = {

   async getDashboardData(req: Request, res: Response): Promise<void>{
        if (!IsAuthenticated(req)){
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }
        const user = await ReturnUserByCookie(req.cookies['sb-access-token']);
        if(await IsClientByUser(user)){
            const dashboardData: Contract[] = await dashBoardService.getDashBoardForClient(user.email);
            res.status(200).json(dashboardData);
            return;
        }
        else{
            const dashboardData: Contract[] = await dashBoardService.getDashBoardForAdmin();
            res.status(200).json(dashboardData);
            return;
        }
    }

};

export default dashBoardControllers;
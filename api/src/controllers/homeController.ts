import { Request, Response } from 'express';


export const homeController = {
    async getInfoUser(req: Request, res: Response): Promise<void> {
        res.status(200).json({ message: "Welcome to the Home Page!" });
    }
}
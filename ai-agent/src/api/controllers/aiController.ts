import { Request, Response } from "express";
import { aiService } from '../services/aiService';

export const aiController = {
    async responseAi(req: Request, res: Response) {
        return aiService.responseAi(req.body, res);
    }
};

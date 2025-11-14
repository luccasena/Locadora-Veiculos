import { ragService } from '../services/ragService';
import { documentRequest } from '../types/documentResquest';

export const ragController = {

    async responseRag(req: documentRequest, res: any) {
        return ragService.addDocument(req, res);
    }
};


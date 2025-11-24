import { Response } from "express";
import { pdfToText, chunkText } from "../utils/fileParse";
import { addDocuments } from "../../rag/vectorStore";
import { documentRequest } from "../types/documentResquest";

export const ragService = {
    
  async addDocument(req: documentRequest, res: Response): Promise<Response> {
    try {
      // 1. Validação do arquivo
      if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo PDF enviado." });
      }

      const collectionName = req.body.collectionName || "default";

      // 2. Extrair texto do PDF
      const buffer = req.file.buffer;
      const text = await pdfToText(buffer);

      // 3. Gerar chunks para o RAG
      const chunks = chunkText(text, 500, 50);

      if (chunks.length === 0) {
        return res.status(400).json({ error: "Nenhum texto válido encontrado no PDF." });
      }

      // 4. Envia chunks ao banco vetorial
      await addDocuments(chunks);

      return res.json({
        message: "Documento adicionado com sucesso.",
        chunks: chunks.length,
        collection: collectionName
      });

    } catch (error: any) {

      return res.status(500).json({
        error: "Erro interno ao processar documento.",
        details: error.message
      });
      
    }
  }
};

import { google } from '@ai-sdk/google';
import { Response } from 'express';
import { generateText } from "ai";
import { AiRequest } from '../types/aiRequest';
import { queryDocuments } from "../../rag/queryVectorStore";

export const aiService = {

    async responseAi(airequest: AiRequest, res: Response) : Promise<Response> {
        
        const relatedDocs = await queryDocuments(airequest.prompt);
        const context = JSON.stringify(relatedDocs);

        try {
            const text = await generateText({
                model: google("gemini-2.5-flash"),
                prompt: `
                    Você é um atendente virtual da locadora de veículos, UrbanMove.
                    Seu propósito é responder de forma clara, natural e objetiva usando o contexto abaixo.

                    Importante: 
                    1. Se o contexto não for suficiente para responder à pergunta, responda que não sabe.
                    2. Não responda perguntas que não estejam relacionadas a locadora de veículos.
                    3. Mantenha as respostas curtas e objetivas.
                    4. O formato das respostas deve ser em texto simples, sem formatação. Você está conversando
                    por chat.

                    Histórico da Conversa, caso exista:
                    ${airequest.context ? airequest.context.join("\n") : "Nenhum histórico de conversa."}

                    Contexto:
                    ${context}

                    Pergunta:
                    ${airequest.prompt}`,
            });

            return res.json({ response: text.output });

        } catch (error: any) {
            console.error("Erro ao chamar modelo:", error.message);

            if (error.message.includes("overloaded")) {
                 return res.status(503).json({ error: "O modelo está temporariamente sobrecarregado. Tente novamente em alguns segundos." });
            }

            return res.status(500).json({ error: "Ocorreu um erro ao processar a solicitação." });
        }    
    }
} 


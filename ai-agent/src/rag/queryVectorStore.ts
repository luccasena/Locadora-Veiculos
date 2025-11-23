import { createClient } from "@supabase/supabase-js";
import { getEmbedding } from "./vectorStore";

const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
);

export async function queryDocuments(queryText: string) {
    try {  

        const queryEmbedding = await getEmbedding(queryText);

        const { data: documents } = await client.rpc('match_documents', {
            query_embedding: queryEmbedding,    
            match_count: 10,                   
        })

        return documents;
        
    } catch (error) {
        console.error("Erro ao consultar documentos:", error);
        throw error;
    }
}



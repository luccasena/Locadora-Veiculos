import { createClient } from "@supabase/supabase-js";
import { getEmbedding } from "./vectorStore";

const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
);

// Consulta documentos similares em uma coleção no Supabase
export async function queryDocuments(queryText: string) {
    try {  

        const queryEmbedding = await getEmbedding(queryText);

        const { data: documents } = await client.rpc('match_documents', {
            query_embedding: queryEmbedding,    // pass the query embedding
            match_count: 10,                    // choose the number of matches
        })

        return documents;
        
    } catch (error) {
        console.error("Erro ao consultar documentos:", error);
        throw error;
    }
}



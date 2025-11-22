import { embed }        from "ai";
import { ENV }          from "../api/config/env";
import { google }       from "@ai-sdk/google";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY)

// Geração de embeddings usando o modelo Gemini
export async function getEmbedding(text: string): Promise<number[]> {
  
    const { embedding } = await embed({
        model: google.textEmbedding("text-embedding-004"), 
        value: text
      }
    );

    return embedding;
}

// Adiciona documentos a uma coleção no Supabase
export async function addDocuments(docs: string[]) {
  for (const doc of docs) {
    const embedding = await getEmbedding(doc);

    const { error } = await supabase.from("documents").insert({
      content: doc,
      embedding,
      metadata: { size: doc.length } 
    });

    if (error) {
      console.error("Erro ao inserir documento:", error);
      throw new Error(error.message);
    }
  }
}
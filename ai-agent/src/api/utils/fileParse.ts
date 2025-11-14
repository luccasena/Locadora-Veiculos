import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

// Função que converte um buffer PDF em texto
export async function pdfToText(buffer: Buffer): Promise<string> {
  
  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(buffer) });

  const pdfDoc = await loadingTask.promise;
  let text = "";

  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((i: any) => i.str).join(" ");
  }

  return text;
}

// Função que divide o texto em chunks menores
export function chunkText(text: string, chunkSize = 500, overlap = 50): string[] {

    const chunks: string[] = [];
    for (let i = 0; i < text.length; i += chunkSize - overlap) {
            chunks.push(text.slice(i, i + chunkSize));
    }

    return chunks;
}

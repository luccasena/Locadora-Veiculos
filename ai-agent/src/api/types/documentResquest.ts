
export type documentRequest = {
  file: Express.Multer.File;       // arquivo enviado no body
  body: {
    collectionName: string;        // nome da coleção no Chroma
  };
} & Request;

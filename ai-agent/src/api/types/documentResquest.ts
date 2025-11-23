
export type documentRequest = {
  file: Express.Multer.File;      
  body: {
    collectionName: string;        
  };
} & Request;

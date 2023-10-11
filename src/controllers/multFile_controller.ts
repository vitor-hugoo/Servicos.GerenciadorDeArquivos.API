import { Request, Response } from "express";
import { upload } from "../configuration/imageUpload_config";
import multer from "multer";
import { HTTPS_PORT, HTTP_PORT } from "../app";

//const imageFolder = "uploads/";

export const createMultFile = (req: Request, res: Response) => {
  const cnpj = req.params.cnpj
  
  upload.array("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).send(err.message);
    } else if (err) {
      return res.status(400).send(err.message);
    }

    try {
      if (!req?.files?.length) {
        return res.status(400).send("Nenhum arquivo enviado.");
      }

      const port = process.env.NODE_ENV === 'prod' ? HTTPS_PORT:HTTP_PORT
      
      const files = req.files as Express.Multer.File[];
      const paths: string[] = files.map(
        (item: Express.Multer.File) =>
          `http://10.0.13.22:${port}/api/files/${cnpj}/${item.filename}`
      );
     
      res.status(200).json({ message: `Imagem salva com sucesso!`, paths });
      console.log(`\nImagen salva com sucesso!\n`);
    } catch (error) {
      console.error("Erro ao criar a imagem: ", error);
      res.status(500).send("Erro ao criar a imagem");
    }
  });
};

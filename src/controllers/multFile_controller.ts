import { Request, Response } from "express";
import fs from "fs";
import { port } from "../app";
import { upload } from "../configuration/imageUpload_config";
import multer from "multer";

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
      
      // const bla = Array<Express.Multer.File>(req.files as unknown as Express.Multer.File)
      
      // const paths = bla.map(file => `http://10.0.13.22:${port}/api/files/${cnpj}/${file.originalname}`)
      
      const imageUrl = `http://10.0.13.22:${port}/api/images/${req.files}`;

      res.status(200).json({ message: `Imagem salva com sucesso!`, imageUrl });
      console.log(`\nImagen salva com sucesso!\n`);
    } catch (error) {
      console.error("Erro ao criar a imagem: ", error);
      res.status(500).send("Erro ao criar a imagem");
    }
  });
};

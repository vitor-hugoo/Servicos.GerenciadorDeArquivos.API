import { Request, Response } from "express";
import fs from "fs";
import { HTTPS_PORT, HTTP_PORT } from "../app";
import path from "path";
import { upload } from "../configuration/fileUpload_config";
import multer from "multer";

const fileFolder = `uploads/`;

export const createFile = (req: Request, res: Response) => {
  const { cnpj } = req.params;
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).send(err.message);
    } else if (err) {
      return res.status(400).send(err.message);
    }

    try {
      if (!req.file) {
        return res.status(400).send("Nenhum arquivo enviado.");
      }

      const port = process.env.NODE_ENV === "prod" ? HTTPS_PORT : HTTP_PORT;

      const fileUrl = `http://10.0.13.22:${port}/api/file/${cnpj}/${req.file.filename}`;

      res.status(200).json({ message: `Arquivo salvo com sucesso!`, fileUrl });
      console.log("\nArquivo salvo com sucesso!\n");
    } catch (error) {
      console.error("Erro ao salvar o Arquivo: ", error);
      res.status(500).send("Erro ao salvar o Arquivo");
    }
  });
};

export const deleteFile = (req: Request, res: Response) => {
  const { filename, cnpj } = req.params;

  const filePath = fileFolder + cnpj + "/" + filename;

  try {
    //fs.unlinkSync(filePath);

    if (!fs.existsSync(filePath)) {
      return res
        .status(404)
        .json({ message: `Arquivo ou diretório não encontrado.` });
    }

    fs.unlinkSync(filePath);
    res.status(200).json({ message: `Arquivo excluído com sucesso` });
    console.log("Arquivo excluído com sucesso!\n");
  } catch (error) {
    console.error("Erro ao excluir o arquivo: ", error);
    res.status(500).send({ message: "Erro ao excluir o arquivo", error });
  }
};

export const listFiles = (req: Request, res: Response) => {
  const cnpj = req.params.cnpj;

  const path = fileFolder + cnpj;

  fs.readdir(path, (err, files) => {
    if (err?.code === "ENOENT") {
      console.error("Erro ao listar os arquivos: ", err);
      res.status(404).json({ error: "Arquivo ou diretório não encontrado." });
      return;
    }
    res.json({ files });
  });
};

export const findFile = (req: Request, res: Response) => {
  const { filename, cnpj } = req.params;
  const filePath = path.join(__dirname, "../..", fileFolder, cnpj, filename);

  try {
    if (fs.existsSync(filePath.replaceAll("\\", "/"))) {
      res.sendFile(filePath);
    } else {
      res.status(404).send("Arquivo ou diretório não encontrado.");
    }
  } catch (error) {
    console.error("Erro ao obter o arquivo: ", error);
    res.status(500).send("Erro ao obter o arquivo");
  }
};

import { Request, Response } from "express";
import fs from "fs";
import { port } from "../app";
import path from "path";

const imageFolder = "uploads/";

export const createImage = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send("Nenhum arquivo enviado.");
    }

    const imageUrl = `http://localhost:${port}/image/${req.file.filename}`;

    res.status(200).json({ message: `Imagem salva com sucesso!`, imageUrl });
    console.log("\nImagen salva com sucesso!\n");
  } catch (error) {
    console.error("Erro ao criar a imagem: ", error);
    res.status(500).send("Erro ao criar a imagem");
  }
};

export const deleteImage = (req: Request, res: Response) => {
  const { filename } = req.params;
  const imagePath = imageFolder + filename;

  try {
    fs.unlinkSync(imagePath);

    res.status(200).send("Imagem excluída com sucesso!");
    console.log("\nImagem excluída com sucesso!\n");
  } catch (error) {
    console.error("Erro ao excluir a imagem: ", error);
    res.status(500).send("Erro ao exluir a imagem");
  }
};

export const listImages = (req: Request, res: Response) => {
  fs.readdir(imageFolder, (err, files) => {
    if (err) {
      console.error("Erro ao listar os arquivos: ", err);
      res.status(500).json({ error: "Erro ao listar os arquivos" });
      return;
    }
    res.json({ files });
  });
};

export const findImage = (req: Request, res: Response) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, "../..", imageFolder, filename);
  
  try {
    if (fs.existsSync(imagePath.replaceAll("\\", "/"))) {
      res.sendFile(imagePath);
    } else {
      res.status(404).send("Imagem não encontrada.");
    }
  } catch (error) {
    console.error("Erro ao obter a imagem: ", error);
    res.status(500).send("Erro ao obter a imagem");
  }
};

export const health = (req: Request, res: Response) => {
  res.status(200).send({ message: "Olá!" });
};

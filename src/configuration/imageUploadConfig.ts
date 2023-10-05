import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const imageFolder = "uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir(imageFolder, (err) => {
      if (err && err.code !== "EEXIST") {
        console.error("Erro ao criar a pasta de uploads: ", err);
      }
      cb(null, imageFolder);
    });
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".")[1];
    const filename = uuidv4() + "--" + Date.now() + "." + ext;

    cb(null, filename);
  },
});

const limits = { fileSize: 20000000 }; // TAMANHO MÁXIMO DE 20 MB

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  const ext = file.originalname.split(".")[1];
  callback(null, ext === "pdf" || ext === "png");
};

export const upload = multer({ storage, limits, fileFilter });

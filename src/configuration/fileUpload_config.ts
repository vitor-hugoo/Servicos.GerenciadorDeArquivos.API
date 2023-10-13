import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileFolder = `uploads/${req.params["cnpj"]}`;

    fs.mkdir(
      fileFolder,
      {
        recursive: true,
      },
      (err) => {
        if (err && err.code !== "EEXIST") {
          console.error("Erro ao criar a pasta de uploads: ", err);
        }
        cb(null, fileFolder);
      }
    );
  },
  filename: (req, file, cb) => {
    const [name, ext ]= file.originalname.split(".");
    const filename = name +"--"+ uuidv4() + "--"+ Date.now() + "." + ext;

    cb(null, filename);
  },
});

const limits = { fileSize: 20971520 }; // TAMANHO MÁXIMO DE 20 MB
//const limits = { fileSize: 200000000000000 }; 

const supportedFiles: String[] = ["pdf", "png", "jpg", "jpeg"];

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  const ext = file.originalname.split(".")[1];
  for (let index = 0; index < supportedFiles.length; index++) {
    if (ext == supportedFiles[index]) {
      return callback(null, true);
    }
  }
  callback(Error(`Tipo de arquivo .${ext.toUpperCase()} não suportado`));
};

export const upload = multer({ storage, limits, fileFilter });

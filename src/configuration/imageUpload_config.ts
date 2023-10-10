import multer, { MulterError } from "multer";
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

//const limits = { fileSize: 20000000 }; // TAMANHO MÁXIMO DE 20 MB
const limits = { fileSize: 200000000000000 }; // TAMANHO MÁXIMO DE 20 MB

const supportedFiles = ['pdf', 'png', 'jpg', 'jpeg']

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  const ext = file.originalname.split(".")[1];
  if (ext === "pdf" || ext === "png" || ext === "jpg" || ext === "jpeg") 
  
  return callback(null, true);

  callback(Error(`Tipo de arquivo .${ext.toUpperCase()} não suportado`));

};

export const upload = multer({ storage, limits, fileFilter });

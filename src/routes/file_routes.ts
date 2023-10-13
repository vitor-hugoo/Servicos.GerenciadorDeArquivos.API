import { Router } from "express";
import {createFile, deleteFile, listFiles, findFile } from "../controllers/file_controller";



const fileRoutes = Router();

fileRoutes.post("/:cnpj", createFile);
fileRoutes.delete("/:cnpj/:filename", deleteFile);
fileRoutes.get("/list/:cnpj", listFiles);
fileRoutes.get("/:cnpj/:filename", findFile)


export default fileRoutes;


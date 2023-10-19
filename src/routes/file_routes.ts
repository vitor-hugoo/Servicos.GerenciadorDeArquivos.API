import { Router } from "express";
import {createFile, deleteFile, listFiles, findFile } from "../controllers/file_controller";
import swaggerJSDoc from "swagger-jsdoc";


const fileRoutes = Router();


/**
 * @swagger
 * /api/file/{cnpj}:
 *  post:
 *      summary: Faz upload de um arquivo.
 *      parameters:
 *          - name: cnpj
 *            in: path
 *            required: true
 *            description: CNPJ da empresa.
 *      responses:
 *          200:
 *              description: Arquivo enviado com sucesso.
 */
fileRoutes.post("/:cnpj", createFile);
fileRoutes.delete("/:cnpj/:filename", deleteFile);
fileRoutes.get("/list/:cnpj", listFiles);
fileRoutes.get("/:cnpj/:filename", findFile)


export default fileRoutes;


import { Router } from "express";
import { createMultFile } from "../controllers/multFile_controller";

const multFileRoutes = Router()

multFileRoutes.post("/:cnpj", createMultFile)

export default multFileRoutes
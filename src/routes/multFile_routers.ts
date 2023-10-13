import { Router } from "express";
import { createMultFiles } from "../controllers/multFiles_controller";

const multFileRoutes = Router()

multFileRoutes.post("/:cnpj", createMultFiles)

export default multFileRoutes
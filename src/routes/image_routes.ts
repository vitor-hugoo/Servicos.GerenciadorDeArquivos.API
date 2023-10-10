import { Router } from "express";
import {createImage, deleteImage, listImages, findImage } from "../controllers/image_controller";
import { upload } from "../configuration/imageUpload_config";


const imageRoutes = Router();

imageRoutes.post("/", createImage);
imageRoutes.delete("/:filename", deleteImage);
imageRoutes.get("/list", listImages);
imageRoutes.get("/:filename", findImage)


export default imageRoutes;
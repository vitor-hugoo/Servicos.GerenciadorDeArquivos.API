import { Router } from "express";
import {createImage, deleteImage, listImages, findImage, health} from "../controllers/imageController";
import { upload } from "../configuration/imageUploadConfig";
import cors from "cors";

const imageRoutes = Router();

imageRoutes.post("/images", upload.single("image"), createImage);
imageRoutes.delete("/images/:filename", deleteImage);
imageRoutes.get("/images/list", listImages);
imageRoutes.get("/images/:filename", findImage)

imageRoutes.get("/", health)


export default imageRoutes;
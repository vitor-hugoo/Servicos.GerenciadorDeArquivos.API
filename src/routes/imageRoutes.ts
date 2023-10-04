import { Router } from "express";
import {createImage, deleteImage, listImages, findImage} from "../controllers/imageController";
import { upload } from "../configuration/imageUploadConfig";

const imageRoutes = Router();

imageRoutes.post("/images", upload.single("image"), createImage);
imageRoutes.delete("/images/:filename", deleteImage);
imageRoutes.get("/images/list", listImages);
imageRoutes.get("/images/:filename", findImage)

export default imageRoutes;
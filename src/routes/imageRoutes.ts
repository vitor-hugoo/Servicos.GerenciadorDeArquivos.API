import { Router } from "express";
import {createImage, deleteImage, listImages} from "../controllers/imageController";
import { upload } from "../configuration/imageUploadConfig";

const imageRoutes = Router();

imageRoutes.post("/images", upload.single("image"), createImage);
imageRoutes.delete("/images/:id", deleteImage);
imageRoutes.get("/images/list", listImages);

export default imageRoutes;

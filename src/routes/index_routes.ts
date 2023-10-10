import express from "express";
//import { authenticateToken } from "../middleware";

import imageRoutes from "./image_routes";
import multFileRoutes from "./multFile_routers";

const router = express.Router();

router.use("/image", imageRoutes);
router.use("/files", multFileRoutes);

export default router;

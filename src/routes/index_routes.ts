import express from "express";
//import { authenticateToken } from "../middleware";

import fileRoutes from "./file_routes";
import multFileRoutes from "./multFile_routers";

const router = express.Router();

router.use("/file", fileRoutes);
router.use("/multi-files", multFileRoutes);

export default router;

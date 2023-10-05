import express from "express";
import imageRoutes from "./routes/imageRoutes";
import cors from "cors";

const app = express();
export const port = process.env.PORT || 3030;

app.use(express.json());
app.use("/api", imageRoutes);

app.use(cors({origin:'*'}));
app.options('*', cors())

app.listen(port, () => {
  console.log(`\nServer is running on http://localhost:${port}\n`);
});

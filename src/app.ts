import express from "express";
import cors from "cors";
import router from "./routes/index_routes";
import healthRouter from "./routes/health_routes";

const app = express();
export const port = process.env.PORT || 3030;

app.use(express.json());

app.use(cors());

app.use('/api', router);

app.use('/', healthRouter)



app.use((req, res) => {
  return res.status(404).json({message: `Rota não encontrada`})
})


app.listen(port, () => {
  console.log(`\nServer is running on http://localhost:${port}\n`);
});

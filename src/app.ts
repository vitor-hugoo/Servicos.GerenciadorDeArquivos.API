import express from "express";
import cors from "cors";
import router from "./routes/index_routes";
import healthRouter from "./routes/health_routes";
import { createServer } from "https";
import { readFileSync } from "fs";
import "dotenv/config";

const app = express();
export const HTTPS_PORT = process.env.PROD_PORT || 3030;
export const HTTP_PORT = process.env.DEV_PORT || 3030;

export const ENV = process.env.NODE_ENV || 'dev'


app.use(express.json());

app.use(cors());

app.use('/api', router);

app.use('/', healthRouter)



app.use((req, res) => {
  return res.status(404).json({message: `Rota não encontrada`})
})




// Inicia o sevidor
if (ENV == "prod") {
  const httpsOptions = {
    key: readFileSync("ssl/key.pem"), // Replace with your private key path
    cert: readFileSync("ssl/cert.pem"), // Replace with your certificate path
  };
  const server = createServer(httpsOptions, app);
  server.listen(HTTPS_PORT, () => {
    console.log(
      `\n Servidor PROD rodando com sucesso https://localhost:${HTTPS_PORT}\n`
    );
  });
} else {
  app.listen(HTTP_PORT, () => {
    console.log(`\nServer DEV is running on http://localhost:${HTTP_PORT}\n`);
  });
}
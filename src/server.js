import express from "express";
import paymentsRouter from "./routes/payments.js";
import cors from "cors";
import { EXTERNAL_URL, PORT } from "./config.js";
const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] }));

app.use("/payments", paymentsRouter);

app.listen(PORT, () => console.log(`Server running on ${EXTERNAL_URL}`));

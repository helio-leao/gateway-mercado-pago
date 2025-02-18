import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

app.get("/webhook", (req, res) => {
  console.log("webhook:", req.body);
  res.json({ message: "Hello world!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

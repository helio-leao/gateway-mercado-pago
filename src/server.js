import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

app.get("/webhook", (req, res) => {
  console.log("deu delicinha", req.body);
  res.json({ message: "Hello world!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

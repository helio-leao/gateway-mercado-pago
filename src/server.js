import express from "express";
import cors from "cors";
import { Payment } from "mercadopago";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

app.get("/payment/:id", async (req, res) => {
  const { id } = req.body;

  try {
    const information = await new Payment({ accessToken }).get({ id });
    res.json(information);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/payment", async (req, res) => {
  const { email, value } = req.body;

  try {
    const paymentData = await new Payment({ accessToken }).create({
      body: {
        transaction_amount: Number(value),
        payment_method_id: "pix",
        payer: { email },
      },
    });
    res.json(paymentData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.post("/webhook", async (req, res) => {
  const { data, action } = req.body;

  if (action !== "payment.update") {
    res.status(500).json({ error: "payment.update is false" });
    return;
  }

  try {
    const response = await axios(`/payment/${data.id}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

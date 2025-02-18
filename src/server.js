import express from "express";
import cors from "cors";
import { Payment } from "mercadopago";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

app.get("/payment", async (req, res) => {
  try {
    const information = await new Payment({ accessToken }).get({
      id: req.headers.paymentid,
    });

    res.json(information);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/payment", async (req, res) => {
  try {
    const paymentData = await new Payment({ accessToken }).create({
      body: {
        transaction_amount: Number(req.headers.value),
        payment_method_id: "pix",
        payer: {
          email: "hmtleao@hotmail.com",
        },
      },
    });
    res.json(paymentData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.post("/webhook", async (req, res) => {
  if (req.body.action !== "payment.update") {
    res.status(500).json({ error: "payment.update is false" });
  }

  try {
    const { data } = await axios("/payment", {
      headers: { paymentid: req.body.data.id },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

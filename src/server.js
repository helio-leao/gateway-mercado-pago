import express from "express";
import { Payment } from "mercadopago";
import axios from "axios";
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const EXTERNAL_URL =
  process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

app.get("/payment/:id", async (req, res) => {
  const { id } = req.params;

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
        transaction_amount: value,
        payment_method_id: "pix",
        payer: { email },
      },
    });
    res.json(paymentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/webhook", async (req, res) => {
  const { data, action } = req.body;

  if (action !== "payment.updated") {
    res.sendStatus(400);
    return;
  }

  res.sendStatus(200);

  // NOTE: whatever you want to do
  try {
    const response = await axios(`${EXTERNAL_URL}/payment/${data.id}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Server running on ${EXTERNAL_URL}`));

import express from "express";
import { Payment } from "mercadopago";
import axios from "axios";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

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

  console.log(1);

  if (action !== "payment.updated") {
    res.sendStatus(400);
    return;
  }

  console.log(2);

  // NOTE: whatever you want to do
  try {
    const response = await axios(`/payment/${data.id}`);
    console.log(3);

    console.log(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    res.sendStatus(200);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

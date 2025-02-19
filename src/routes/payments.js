import { Router } from "express";
import { Payment } from "mercadopago";
import axios from "axios";
import { accessToken, EXTERNAL_URL } from "../config.js";
const router = Router();

router.post("/webhook", async (req, res) => {
  const { data, action } = req.body;

  if (action !== "payment.updated") {
    res.sendStatus(400);
    return;
  }

  res.sendStatus(200);

  try {
    const response = await axios(`${EXTERNAL_URL}/payment/${data.id}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
});

router.post("/pix", async (req, res) => {
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

router.post("/credit-card", async (req, res) => {
  const { email, value, token, installments } = req.body;

  try {
    const paymentData = await new Payment({ accessToken }).create({
      body: {
        transaction_amount: value,
        payment_method_id: "credit_card",
        payer: { email },
        token,
        installments,
      },
    });
    res.json(paymentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const information = await new Payment({ accessToken }).get({ id });
    res.json(information);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;

const PORT = process.env.PORT || 3000;
const EXTERNAL_URL =
  process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

if (!accessToken) {
  console.error("Mercado Pago access token not defined");
  process.exit(1);
}

export { PORT, EXTERNAL_URL, accessToken };

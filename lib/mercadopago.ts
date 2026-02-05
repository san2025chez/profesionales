import "server-only";
import { MercadoPagoConfig, PreApproval } from "mercadopago";

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN ?? "";

const client = new MercadoPagoConfig({
  accessToken,
});

export const preapprovalClient = new PreApproval(client);

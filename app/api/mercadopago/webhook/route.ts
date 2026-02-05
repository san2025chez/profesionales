import { NextResponse } from "next/server";
import { preapprovalClient } from "@/lib/mercadopago";
import { supabaseAdmin } from "@/lib/supabase-admin";

type MercadoPagoWebhookBody = {
  type?: string;
  data?: { id?: string };
  topic?: string;
  id?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as MercadoPagoWebhookBody;
  const preapprovalId = body?.data?.id ?? body?.id;

  if (!preapprovalId) {
    return NextResponse.json({ ok: true });
  }

  const preapproval = await preapprovalClient.get({ id: preapprovalId });
  const status = preapproval?.status ?? "unknown";
  const nextPaymentDate = preapproval?.next_payment_date ?? null;

  const isFeatured = status === "authorized" || status === "active";

  await supabaseAdmin
    .from("professionals")
    .update({
      subscription_status: status,
      subscription_end: nextPaymentDate,
      is_featured: isFeatured,
    })
    .eq("mp_preapproval_id", preapprovalId);

  return NextResponse.json({ ok: true });
}

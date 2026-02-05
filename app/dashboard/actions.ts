"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { preapprovalClient } from "@/lib/mercadopago";
import { redirect } from "next/navigation";

export async function upsertProfessional(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image_url = String(formData.get("image_url") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const contact = String(formData.get("contact") ?? "").trim();

  if (!name || !category || !description) {
    redirect("/dashboard?error=missing");
  }

  const { error } = await supabase.from("professionals").upsert(
    {
      user_id: user.id,
      name,
      category,
      description,
      image_url: image_url || null,
      location: location || null,
      contact: contact || null,
    },
    { onConflict: "user_id" }
  );

  if (error) {
    redirect("/dashboard?error=save");
  }

  redirect("/dashboard?saved=1");
}

export async function createSubscription() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
  }

  if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
    redirect("/dashboard?error=payment");
  }

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() + 1);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const response = await preapprovalClient.create({
    body: {
      reason: "Plan mensual - Directorio de Profesionales",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 2000,
        currency_id: "ARS",
        start_date: startDate.toISOString(),
      },
      payer_email: user.email,
      back_url: `${siteUrl}/dashboard`,
    },
  });

  const preapprovalId = response?.id;
  const initPoint = response?.init_point;

  if (!preapprovalId || !initPoint) {
    redirect("/dashboard?error=payment");
  }

  const { error } = await supabase
    .from("professionals")
    .update({
      mp_preapproval_id: preapprovalId,
      subscription_status: "pending",
    })
    .eq("user_id", user.id);

  if (error) {
    redirect("/dashboard?error=payment");
  }

  redirect(initPoint);
}

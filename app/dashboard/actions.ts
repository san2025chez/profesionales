"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { preapprovalClient } from "@/lib/mercadopago";
import { directoryCategories } from "@/lib/categories";
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
  const country = String(formData.get("country") ?? "").trim();
  const province = String(formData.get("province") ?? "").trim();
  const locality = String(formData.get("locality") ?? "").trim();
  const location = [locality, province].filter(Boolean).join(", ");
  const contact = String(formData.get("contact") ?? "").trim();
  const requestedPlan = String(formData.get("plan") ?? "free").trim();
  const link_whatsapp = String(formData.get("link_whatsapp") ?? "").trim();
  const redes_sociales = String(formData.get("redes_sociales") ?? "").trim();
  const gallery_images = String(formData.get("gallery_images") ?? "").trim();
  const license_number = String(formData.get("license_number") ?? "").trim();

  const allowedCategories = new Set(
    directoryCategories.flatMap((group) => group.items)
  );

  if (!name || !category || !description || !allowedCategories.has(category)) {
    redirect("/dashboard?error=missing");
  }

  const { data: currentProfile } = await supabase
    .from("professionals")
    .select("subscription_status")
    .eq("user_id", user.id)
    .maybeSingle();

  const canBePremium =
    currentProfile?.subscription_status === "authorized" ||
    currentProfile?.subscription_status === "active";

  const plan =
    requestedPlan === "premium" && canBePremium ? "premium" : "free";

  const payload: Record<string, string | null> = {
    user_id: user.id,
    name,
    category,
    description,
    location: location || null,
    country: country || null,
    province: province || null,
    locality: locality || null,
    contact: contact || null,
    plan,
  };

  if (image_url) {
    payload.image_url = image_url;
  }

  if (plan === "premium") {
    payload.link_whatsapp = link_whatsapp || null;
    payload.redes_sociales = redes_sociales || null;
    payload.gallery_images = gallery_images || null;
    payload.license_number = license_number || null;
  } else {
    payload.link_whatsapp = null;
    payload.redes_sociales = null;
    payload.gallery_images = null;
    payload.license_number = null;
  }

  const { error } = await supabase
    .from("professionals")
    .upsert(payload, { onConflict: "user_id" });

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

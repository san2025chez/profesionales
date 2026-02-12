"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function deleteProfessionalById(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: roleRow } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (roleRow?.role !== "admin") {
    redirect("/dashboard");
  }

  const professionalId = String(formData.get("professional_id") ?? "");
  if (!professionalId) {
    redirect("/admin");
  }

  await supabaseAdmin.from("professionals").delete().eq("id", professionalId);

  redirect("/admin?deleted=1");
}

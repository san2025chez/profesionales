import { createSupabaseServerClient } from "@/lib/supabase-server";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: roleRow } = user
    ? await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle()
    : { data: null };
  const isAdmin = roleRow?.role === "admin";

  return <NavbarClient user={user} isAdmin={!!isAdmin} />;
}

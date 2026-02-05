"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-full border border-slate-600/80 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-primary/60 hover:text-white"
    >
      Cerrar sesión
    </button>
  );
}

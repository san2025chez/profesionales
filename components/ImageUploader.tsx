"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type ImageUploaderProps = {
  userId: string;
  initialUrl?: string | null;
  inputName?: string;
};

export default function ImageUploader({
  userId,
  initialUrl,
  inputName = "image_url",
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState(initialUrl ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    const fileExt = file.name.split(".").pop() ?? "jpg";
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("professional-images")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setError("No se pudo subir la imagen. Intenta nuevamente.");
      setLoading(false);
      return;
    }

    const { data } = supabase.storage
      .from("professional-images")
      .getPublicUrl(filePath);

    setImageUrl(data.publicUrl);
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      <input type="hidden" name={inputName} value={imageUrl} />
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Imagen de perfil"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
              Sin foto
            </div>
          )}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-primary/60">
          <span>{loading ? "Subiendo..." : "Subir imagen"}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={loading}
          />
        </label>
      </div>
      {error ? (
        <p className="text-xs text-red-300">{error}</p>
      ) : (
        <p className="text-xs text-slate-400">
          Formatos sugeridos: JPG o PNG, máx. 5MB.
        </p>
      )}
    </div>
  );
}
